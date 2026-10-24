const dialog = document.querySelector<HTMLDialogElement>('#apply-dialog');
const form = document.querySelector<HTMLFormElement>('#apply-form');
const applyStatus = document.querySelector<HTMLElement>('#apply-status');
const roleName = document.querySelector<HTMLElement>('#apply-role-name');
const submitButton = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
const submitLabel = submitButton?.querySelector('span');
let pending = false;
let submitted = false;
let currentRole = '';

function showStatus(message: string, state: 'error' | 'success' | 'pending') {
  if (!applyStatus) return;
  applyStatus.textContent = message;
  applyStatus.dataset.state = state;
}

function resetForm() {
  form?.reset();
  if (applyStatus) { applyStatus.textContent = ''; delete applyStatus.dataset.state; }
  if (submitButton) submitButton.disabled = false;
  if (submitLabel) submitLabel.textContent = 'Submit application';
}

// Open the form for the role whose button was clicked
document.querySelectorAll<HTMLButtonElement>('[data-apply-role]').forEach(button => button.addEventListener('click', () => {
  if (!dialog || !form) return;
  const role = button.dataset.applyRole || '';
  // Keep typed details if the same form is reopened; start fresh after a submission or for a new role
  if (!pending && (submitted || role !== currentRole)) resetForm();
  currentRole = role;
  submitted = false;
  const roleInput = form.elements.namedItem('role');
  const subjectInput = form.elements.namedItem('subject');
  if (roleInput instanceof HTMLInputElement) roleInput.value = role;
  if (subjectInput instanceof HTMLInputElement) subjectInput.value = `New job application — ${role}`;
  if (roleName) roleName.textContent = role;
  dialog.showModal();
}));

dialog?.querySelector('.apply-close')?.addEventListener('click', () => dialog.close());
// Close when clicking the dark area outside the form
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

form?.addEventListener('submit', async event => {
  event.preventDefault();
  if (pending || !form || !submitButton) return;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  if (data.get('botcheck')) return;
  const name = String(data.get('name') || '').trim();
  if (!name) { showStatus('Please enter your name.', 'error'); return; }
  data.set('name', name);
  const email = String(data.get('email') || '').trim();
  if (email) data.set('replyto', email);

  pending = true;
  submitButton.disabled = true;
  form.setAttribute('aria-busy', 'true');
  if (submitLabel) submitLabel.textContent = 'Sending…';
  showStatus('Sending your application…', 'pending');
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data, signal: controller.signal });
    const result = await response.json();
    if (!response.ok || result.success !== true) throw new Error('Submission rejected');
    showStatus('Thank you. Your application has been submitted. We will contact you if your profile matches the role.', 'success');
    form.reset();
    submitted = true;
    if (submitLabel) submitLabel.textContent = 'Application submitted';
  } catch {
    showStatus('We couldn’t confirm your submission. Your details are still here. Please try again, or email your CV to us directly.', 'error');
  } finally {
    clearTimeout(timeout);
    pending = false;
    submitButton.disabled = submitted;
    form.removeAttribute('aria-busy');
    if (!submitted && submitLabel) submitLabel.textContent = 'Submit application';
    applyStatus?.focus();
  }
});

export {};
