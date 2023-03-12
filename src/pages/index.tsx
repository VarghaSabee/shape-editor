import styled from "styled-components";
import Editor from "@/components/editor/editor";

const Home: React.FC = () => {
  return (
    <Container>
      <Editor />
    </Container>
  );
};

export default Home;

// Styled
const Container = styled.main`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
`;
