import amplitude from 'amplitude-js';

const ampInst = amplitude.getInstance();
ampInst.init(process.env.AMPLITUDE_API_KEY);
const ampEvent = (event) => {
    ampInst.logEvent(event);
};
const ampEventWithEventProperty = (event, props) => {
    ampInst.logEvent(event, props);
};
const ampSetUserProperty = (key, value) => {
    const identify = new amplitude.Identify().set(key, value);
    ampInst.identify(identify);
};
const ampSetUserGroupProperty = (propertyObj) => {
    ampInst.setUserProperties(propertyObj);
};
const ampSetUserId = (id) => {
    ampInst.setUserId(id);
};
export { ampEvent, ampEventWithEventProperty, ampSetUserGroupProperty, ampSetUserId, ampSetUserProperty };
