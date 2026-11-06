document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('message-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const name = form.elements.sender_name.value.trim();
    const email = form.elements.sender_email.value.trim();
    const subject = form.elements.subject.value.trim();
    const message = form.elements.message.value.trim();
    const params = new URLSearchParams({
      subject,
      body: `Name: ${name}\nEmail: ${email}\n\n${message}`
    });

    if (form.elements.copy.checked) params.set('cc', email);
    document.getElementById('message-status').textContent = 'Your email app should open. Review the message and send it there.';
    window.location.href = `mailto:mikesoita962@gmail.com?${params.toString().replace(/\+/g, '%20')}`;
  });
});
