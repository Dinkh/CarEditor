import MainContainer from './MainContainer.mjs';

export const onStart = () => Neo.app({
    appThemeFolder: 'bmweditor',
    mainView: MainContainer,
    name    : 'MeasureTool'
});