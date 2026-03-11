/**
 * Sets up a counter button that increments on click
 * @param {HTMLElement} element - The button element to attach the counter to
 */
export function setupCounter(element) {
  let counter = 0;

  const setCounter = (count) => {
    counter = count;
    const counterSpan = element.querySelector('#counter');
    if (counterSpan) {
      counterSpan.textContent = counter.toString();
    }
  };

  element.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
}
