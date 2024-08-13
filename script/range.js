function setMood(range) {
  const score = { 0: 'bad', 50: 'not-bad', 100: 'good' };
  const mood = score[range.value];

  document.body.dataset.mood = mood;
  range.setAttribute('aria-valuetext', mood);
}

function createRangeController(options = {}) {
  const DIRECTION_CLICK = 'click';
  const DIRECTION_RIGHT = 'right';
  const DIRECTION_LEFT = 'left';

  const controller = {
    direction: DIRECTION_CLICK,
    lastValue: options.initialValue,
  
    oninput: event => {
      const { value } = event.target;
      const { lastValue } = controller;

      if (value === lastValue) {
        controller.direction = DIRECTION_CLICK;
      } else {
        controller.direction = value > lastValue
          ? DIRECTION_RIGHT
          : DIRECTION_LEFT;
      }

      controller.lastValue = event.target.value;
    },

    onchange: event => {
      const { value } = event.target;

      const slideTo = {
        [DIRECTION_LEFT]: value <= 45 ? 0 : 50,
        [DIRECTION_RIGHT]: value <= 55 ? 50 : 100,
        [DIRECTION_CLICK]: value < 50 ? 0 : 100,
      };

      controller.lastValue = slideTo[controller.direction];
      event.target.value = controller.lastValue;

      options.changed && queueMicrotask(() => {
        options.changed(event, controller);
      });
    }
  };

  return controller;
}

function assignRangeController(range) {
  const controller = createRangeController({
    initialValue: range.value,
    changed: e => setMood(e.target),
  });

  Object.assign(range, controller);
}

// ---------------------------------------------------------

assignRangeController(document.getElementById('main-range'));
