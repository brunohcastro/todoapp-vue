import styled from 'vue-styled-components';

export default styled('b-button')`
  border-radius: 0 !important;
  border: none !important;
  height: 70px;
  width: 40px;
  transition: all 0.2s;
  padding: 0 !important;
  &:focus {
    box-shadow: none !important;
  }
`;
