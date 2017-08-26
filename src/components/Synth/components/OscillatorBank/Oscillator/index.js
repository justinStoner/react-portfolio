import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from '../../../../components/Select';
import Container from '../../../../components/Container';
import RangeControl from '../../../../components/RangeControl';
import WaveShapeSelector from '../../../../components/WaveShapeSelector';

const ColContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & > div {
    flex: 1;

    & > h3 {
      margin-top: 0;
    }
  }

  & > div:not(:first-of-type) {
    margin-left: 10px;
  }
`;

const Oscillator = ({ oscillator, remove, setValue }) => {
  const octaves = [-2, -1, 0, 1, 2].map(s => ({ id: s, name: s }));
  return (
    <Container active close={() => remove(oscillator.id)}>
      <ColContainer>
        <div>
          <Select
            labelKey="name"
            onChange={e => setValue(oscillator.id, e.id, 'octave')}
            options={octaves}
            searchable={false}
            title="Octave"
            value={oscillator.octave}
            valueKey="id"
          />
        </div>
        <WaveShapeSelector
          value={oscillator.waveShape}
          change={e => setValue(oscillator.id, e, 'waveShape')}
        />
      </ColContainer>
      <RangeControl
        title="Detune"
        value={oscillator.detune}
        onSet={e => setValue(oscillator.id, e, 'detune')}
        min={-64}
        max={64}
      />
      <RangeControl
        title="Gain"
        value={oscillator.gain}
        onSet={e => setValue(oscillator.id, e, 'gain')}
        min={0}
        max={1}
      />
    </Container>
  );
};

Oscillator.propTypes = {
  oscillator: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
};

export default Oscillator;
