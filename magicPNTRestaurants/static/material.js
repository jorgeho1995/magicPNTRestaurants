// Create cards
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__actions';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
    console.log(el);
    return new mdc.ripples.MDCRipple(el);
});