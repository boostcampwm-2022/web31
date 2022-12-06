import React, {useState, useRef, useEffect, useMemo} from "react";
import styled from "styled-components";
import { editorState } from "../../recoils";
import {useRecoilState} from "recoil";
import { SelectButton } from "../../assets/icons";

const SelectorWrapper = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  width: 4.5rem;
  height: 1.3rem;
  border: 2px solid #CBCBCB;
  border-radius: 0.3rem;
  background: #fff;
  text-align: center;
  font-weight: 500;
  font-size: 0.5rem;
  line-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1;
  &: hover {
    border: 2px solid #ABABAB;
  }
`;

const ModalButton = styled.img`
  width: 0.6rem;
  height: 0.6rem;
  cursor: pointer;
  position: relative;
`;

const ModalWrapper = styled.div`
  width: 4.5rem;
  height: fit-content;
  position: absolute;
  top: 1.2rem;
  border: 2px solid #CBCBCB;
  background: rgba(256, 256, 256, 0.8);
  border-radius: 0.3rem;
  z-index: 1;
`;

const ModalElement = styled.div`
  font-size: 0.5rem;
  cursor: pointer;
  width: 100%;
  height: 1.2rem;
  text-align: center;
  line-height: 1.2rem;
  &: hover {
    background: rgba(240, 240, 240, 0.8);
  }
`;

const Modal = () => {
  return (
    <ModalWrapper>
      <ModalElement>JavaScript</ModalElement>
      <ModalElement>Python</ModalElement>
    </ModalWrapper>
  );
};

const LanguageSelector = () => {
  const [editor, setEditor] = useRecoilState(editorState);
  const [open, setOpen] = useState(false);

  return (
    <SelectorWrapper onClick={() => setOpen(!open)}>
      JavaScript
      <ModalButton src={SelectButton} />
      {open && <Modal />}
    </SelectorWrapper>
  );
}

export default LanguageSelector
