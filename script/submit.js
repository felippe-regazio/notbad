const $form = document.forms['main-form'];

function uiShowThanks() {
  const $template = document.getElementById('submitted');
  const $target = document.querySelector('.submitted');
  $target.append($template.content.cloneNode(true));
}

function submit(data) {
  uiShowThanks(data);

  /* do whatever you want with data */
  console.log('[submitted]', data.get('score'), '-', data.get('note'));
}

$form.onsubmit = e => {
  e.preventDefault();
  document.body.dataset.submitted = true;
  const data = new FormData($form);
  submit(data);
}
