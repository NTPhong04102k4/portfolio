/* ========================================================
   COMPONENT — Contact Form
   ======================================================== */
import { $ } from '../utils.js';
import { validateEmail } from '../utils.js';
import { SELECTORS, EMAIL_REGEX, FORM_MESSAGES, CONTACT_EMAIL } from '../constants.js';

/**
 * Initialise contact form validation and mailto fallback.
 */
export function initContactForm() {
  const form = $(SELECTORS.contactForm);
  if (!form) return;

  form.addEventListener('submit', (e) => {
    const name = $(SELECTORS.formName).value.trim();
    const email = $(SELECTORS.formEmail).value.trim();
    const subject = $(SELECTORS.formSubject).value.trim();
    const message = $(SELECTORS.formMessage).value.trim();

    if (!name || !email || !subject || !message) {
      e.preventDefault();
      alert(FORM_MESSAGES.emptyFields);
      return;
    }

    if (!validateEmail(email, EMAIL_REGEX)) {
      e.preventDefault();
      alert(FORM_MESSAGES.invalidEmail);
      return;
    }

    // If no formspree configured, use mailto fallback
    if (form.action.includes('your-form-id')) {
      e.preventDefault();
      const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Từ: ${name}\nEmail: ${email}\n\n${message}`)}`;
      window.location.href = mailtoLink;
    }
  });
}
