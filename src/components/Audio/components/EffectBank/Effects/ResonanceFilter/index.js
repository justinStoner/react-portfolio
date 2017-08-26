import React from 'react';
import PropTypes from 'prop-types';
import Effect from '../Effect';
import EffectRange from '../../EffectRange';
import {
  checkPropChange,
  defaultEffectSettings
} from '../../../../../../utils/effect';

export const defaultSettings = Object.assign({}, defaultEffectSettings, {
  color: '#325c74',
  cutoff: {
    min: 0,
    max: 1,
    name: 'Cutoff',
    value: 0.065
  },
  name: 'ResonanceFilter',
  resonance: {
    min: 0,
    max: 4,
    name: 'Resonance',
    value: 3.99
  },
  title: 'Resonance Filter'
});

class ResonanceFilter extends React.Component {
  constructor(props) {
    super(props);

    this.applySettings = this.applySettings.bind(this);
    this.setupAudio = this.setupAudio.bind(this);
  }

  componentDidMount() {
    this.setupAudio();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props) {
      this.applySettings(nextProps, this.props);
    }
  }

  applySettings(next, prev) {
    if (checkPropChange(prev, next, 'cutoff')) {
      this.effect.cutoff = next.settings.cutoff.value;
    }
    if (checkPropChange(prev, next, 'resonance')) {
      this.effect.resonance = next.settings.resonance.value;
    }
    this.props.wire(next, prev, this.effect);
  }

  createFilter(context) {
    const bufferSize = 1024;
    const node = context.createScriptProcessor(bufferSize, 1, 1);
    let in1, in2, in3, in4, out1, out2, out3, out4;
    in1 = in2 = in3 = in4 = out1 = out2 = out3 = out4 = 0.0;
    // between 0.0 and 1.0
    node.cutoff = defaultSettings.cutoff;
    // between 0.0 and 4.0
    node.resonance = defaultSettings.resonance;
    node.onaudioprocess = e => {
      const input = e.inputBuffer.getChannelData(0);
      const output = e.outputBuffer.getChannelData(0);
      const f = node.cutoff * 1.16;
      const fb = node.resonance * (1.0 - 0.15 * f * f);
      for (let i = 0; i < bufferSize; i++) {
        input[i] -= out4 * fb;
        input[i] *= 0.35013 * (f * f) * (f * f);
        // Pole 1
        out1 = input[i] + 0.3 * in1 + (1 - f) * out1;
        in1 = input[i];
        // Pole 2
        out2 = out1 + 0.3 * in2 + (1 - f) * out2;
        in2 = out1;
        // Pole 3
        out3 = out2 + 0.3 * in3 + (1 - f) * out3;
        in3 = out2;
        // Pole 4
        out4 = out3 + 0.3 * in4 + (1 - f) * out4;
        in4 = out3;
        output[i] = out4;
      }
    };
    return node;
  }

  setupAudio() {
    this.effect = this.createFilter(this.props.context);
    this.applySettings(this.props);
  }

  render() {
    return (
      <div>
        <EffectRange
          change={this.props.handleSettingsChange}
          defaults={defaultSettings}
          property="cutoff"
          settings={this.props.settings}
        />
        <EffectRange
          change={this.props.handleSettingsChange}
          defaults={defaultSettings}
          property="resonance"
          settings={this.props.settings}
        />
      </div>
    );
  }
}

ResonanceFilter.propTypes = {
  context: PropTypes.object.isRequired,
  handleSettingsChange: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  wire: PropTypes.func.isRequired
};

export default Effect(ResonanceFilter);
