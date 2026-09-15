const form = document.querySelector<HTMLFormElement>('#enquiry-form');
const enquiryStatus = document.querySelector<HTMLElement>('#form-status');
const button = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
const label = button?.querySelector('span');
let pending = false;

function showStatus(message: string, state: 'error' | 'success' | 'pending') {
  if (!enquiryStatus) return;
  enquiryStatus.textContent = message;
  enquiryStatus.dataset.state = state;
}

form?.addEventListener('submit', async event => {
  event.preventDefault();
  if (pending || !form || !button) return;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  if (data.get('botcheck')) return;
  const name = String(data.get('name') || '').trim();
  const message = String(data.get('message') || '').trim();
  if (!name || message.length < 10) { showStatus('Please enter your name and a message of at least 10 characters.', 'error'); return; }
  const email = String(data.get('email') || '').trim();
  if (form.dataset.configured !== 'true') {
    showStatus('Direct enquiry delivery is still being activated. Please use the email or phone details on this page.', 'error');
    return;
  }
  data.set('name', name);
  data.set('message', message);
  data.set('replyto', email);
  pending = true;
  button.disabled = true;
  form.setAttribute('aria-busy', 'true');
  if (label) label.textContent = 'Sending…';
  showStatus('Sending your enquiry…', 'pending');
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 20000);
  let submitted = false;
  try {
    const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data, signal: controller.signal });
    const result = await response.json();
    if (!response.ok || result.success !== true) throw new Error('Submission rejected');
    showStatus('Thank you. Your enquiry has been submitted successfully.', 'success');
    form.reset();
    submitted = true;
    if (label) label.textContent = 'Enquiry submitted';
    button.setAttribute('aria-label', 'Enquiry submitted successfully');
  } catch {
    showStatus('We couldn’t confirm your submission. Your message is still here. Please try again or connect with us directly.', 'error');
  } finally {
    clearTimeout(timeout);
    pending = false;
    button.disabled = submitted;
    form.removeAttribute('aria-busy');
    if (!submitted && label) label.textContent = 'Send enquiry';
    enquiryStatus?.focus();
  }
});
