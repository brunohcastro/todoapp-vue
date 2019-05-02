import styled from 'vue-styled-components';

const spanProps = { completed: Boolean };

export default styled('span', spanProps)`
  text-align: left;
  padding: 15px;
  line-height: 40px;
  margin: 0s;
  width: 390px;
  font-size: 21px;
  word-break: break-word;
  display: inline-block;
  user-select: none;

  color: ${props => (props.completed ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.8)')};
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
`;
