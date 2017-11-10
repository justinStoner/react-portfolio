import React from 'react';
import EqUI from './EqUI';
import renderer from 'react-test-renderer';
import { defaultEffectSettings } from '../../utils/audio';

defaultEffectSettings.eq.id="eq"

test('EqUI gets set to inactive when disabled and active when enabled', () => {
  const component = renderer.create(
    <EqUI effects={defaultEffectSettings} parent="synth" id="eq" effects={defaultEffectSettings}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.toggleEffect();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.toggleEffect();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
