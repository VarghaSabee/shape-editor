import { IEditorStyles, useEditor } from "@/libs/hooks/useEditor";
import styled from "styled-components";
import Icon from "@mdi/react";
import React from "react";

interface IEditorStylesProps {
  editorStyles: IEditorStyles;
}

type IToolbarActionProps = IEditorStylesProps & {
  active?: boolean;
  disabled?: boolean;
};

const Editor: React.FC = () => {
  const { canvasRef, editorStyles, sideToolbar, toolbar } = useEditor();

  return (
    <Container>
      <Wrapper editorStyles={editorStyles}>
        <Toolbar editorStyles={editorStyles}>
          <LogoWrapper>
            <Logo>DoShape</Logo>
          </LogoWrapper>
          {toolbar.tools.map((tool) => (
            <ToolbarAction
              editorStyles={editorStyles}
              disabled={tool.disabled}
              onClick={tool.onClick}
              title={tool.name}
              key={tool.id}
            >
              <Icon path={tool.iconPath} size="28px" />
            </ToolbarAction>
          ))}
        </Toolbar>
        <SideToolbar editorStyles={editorStyles}>
          {sideToolbar.shapes.map((shape) => (
            <SideToolbarAction
              key={shape.id}
              title={shape.name}
              editorStyles={editorStyles}
              onClick={() => sideToolbar.onSelectShape(shape)}
              active={shape.id === sideToolbar.activeShape?.id}
            >
              <Icon path={shape.iconPath} size="28px" />
            </SideToolbarAction>
          ))}
        </SideToolbar>
        <Canvas ref={canvasRef} editorStyles={editorStyles} />
      </Wrapper>
    </Container>
  );
};

export default Editor;

// Styled

const Container = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 24px;
  height: 100%;
  width: 100%;
`;

const Wrapper = styled.div<IEditorStylesProps>`
  width: 100%;
  height: 100%;
  max-width: ${({ editorStyles }) => `${editorStyles.maxWidth}px`};
  max-height: ${({ editorStyles }) => `${editorStyles.maxHeight}px`};

  display: grid;
  grid-template-columns: ${({ editorStyles }) =>
    `${editorStyles.toolbarSize}px auto`};
  grid-template-rows: ${({ editorStyles }) =>
    `${editorStyles.toolbarSize}px auto`};
  grid-template-areas:
    "toolbar toolbar"
    "sidetoolbar canvas";
`;

const Toolbar = styled.div<IEditorStylesProps>`
  display: flex;
  grid-area: toolbar;
  align-items: center;
  border-radius: ${({ editorStyles }) =>
    `${editorStyles.borderRadius}px ${editorStyles.borderRadius}px 0px 0px`};
  border-top: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
  border-left: 1px solid #dbdbdb;
`;

const SideToolbar = styled.div<IEditorStylesProps>`
  grid-area: sidetoolbar;
  border-radius: ${({ editorStyles }) =>
    `0px 0px 0px ${editorStyles.borderRadius}px`};
  border-top: 1px solid #dbdbdb;
  border-left: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
`;

const Canvas = styled.canvas<IEditorStylesProps>`
  width: 100%;
  height: 100%;
  grid-area: canvas;
  border: 1px solid #dbdbdb;
  border-radius: ${({ editorStyles }) =>
    `0px 0px ${editorStyles.borderRadius}px 0px`};
`;

const ToolbarAction = styled.button<IToolbarActionProps>`
  padding: 0;
  width: ${({ editorStyles }) => `${editorStyles.toolbarSize}px`};
  height: ${({ editorStyles }) => `${editorStyles.toolbarSize}px`};
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  justify-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-color: ${({ active }) => (active ? "#1f1d1d" : "tansparent")}; ;
`;

const SideToolbarAction = styled(ToolbarAction)`
  border-right: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const LogoWrapper = styled.div`
  padding: 10px 8px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
`;

const Logo = styled.span`
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
`;
