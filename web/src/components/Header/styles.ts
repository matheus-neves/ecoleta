import styled from 'styled-components';

export const Container = styled.header`
  margin-top: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: var(--title-color);
    font-weight: bold;
    text-decoration: none;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
      color: var(--primary-color);
    }
  }

  @media (max-width: 900px) {
    header {
      margin: 48px auto 0;
    }
  }
`;
