/* ========================================================
   TEMPLATE — Contact Section
   ======================================================== */
import { CONTACT_INFO, FORM_ACTION, FORM_FIELDS } from '../constants.js';

/**
 * Render one Material 3 outlined text field.
 * The outline is split into leading / notch / trailing pieces so the
 * floated label can "cut" the border over any background (glass card).
 * @param {{id:string,name:string,label:string,type?:string,textarea?:boolean,autocomplete?:string,rows?:number}} f
 * @returns {string} HTML string
 */
function renderField(f) {
  const common = `id="${f.id}" name="${f.name}" required placeholder=" " aria-describedby="${f.id}-hint"`;
  const control = f.textarea
    ? `<textarea ${common} rows="${f.rows ?? 5}"></textarea>`
    : `<input type="${f.type ?? 'text'}" ${common}${f.autocomplete ? ` autocomplete="${f.autocomplete}"` : ''} />`;

  return `
            <div class="form-group">
              <div class="form-group__field">
                ${control}
                <div class="form-group__outline" aria-hidden="true">
                  <span class="form-group__outline-leading"></span>
                  <span class="form-group__outline-notch"><label for="${f.id}">${f.label}</label></span>
                  <span class="form-group__outline-trailing"></span>
                </div>
              </div>
              <p class="form-group__hint" id="${f.id}-hint" aria-live="polite"></p>
            </div>`;
}

/**
 * Render the contact section with info card and form.
 * @returns {string} HTML string
 */
export function renderContact() {
  const infoItems = CONTACT_INFO.map((item) => {
    const valueHtml = item.href
      ? `<a href="${item.href}"${item.target ? ` target="${item.target}" rel="noopener"` : ''}>${item.value}</a>`
      : `<p>${item.value}</p>`;

    return `
            <div class="contact__info-item">
              <div class="contact__info-icon"><i class="${item.icon}"></i></div>
              <div>
                <h4>${item.title}</h4>
                ${valueHtml}
              </div>
            </div>`;
  }).join('\n');

  const fields = FORM_FIELDS.map(renderField).join('\n');

  return `
  <section id="contact" class="section contact">
    <div class="container">
      <h2 class="section__title reveal-up">
        <span class="section__number">05.</span> Liên hệ
      </h2>
      <p class="contact__subtitle reveal-up">
        Bạn có dự án hay cơ hội hợp tác? Hãy liên hệ với mình nhé!
      </p>
      <div class="contact__grid">
        <div class="contact__info reveal-left">
          <div class="glass-card contact__info-card">
            ${infoItems}
          </div>
        </div>
        <form id="contact-form" class="contact__form reveal-right" action="${FORM_ACTION}" method="POST" novalidate>
          <div class="glass-card contact__form-card">
            ${fields}
            <button type="submit" class="btn btn--primary contact__submit">
              <i class="fas fa-paper-plane"></i> Gửi tin nhắn
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>`;
}
