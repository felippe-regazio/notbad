const $note = document.querySelector('textarea[name=note]');
const $actions = document.querySelector('.facebox .actions');
const setCleanMode = v => (document.body.dataset.clean = v);

$note.addEventListener('input', () => {
  $note.value = $note.value.replace(/(\r\n|\n|\r)/gm, '');
});

$actions.addEventListener('focusin', () => {
  setCleanMode(true);
});

$actions.addEventListener('focusout', () => {
  setTimeout(() => setCleanMode(false), 60);
});
