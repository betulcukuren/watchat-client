
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    transition: all 0.25s linear;
  }

  /******  chat colors ***** */

  .outerContainer {
    background-color:  ${({ theme }) => theme.bg};
  }
  
  .container {
    background: ${({ theme }) => theme.lightenMain};
  }
  
  .slider {
    background-color: ${({ theme }) => theme.toggleBg};
    border: 1px solid ${({ theme }) => theme.linkActive};
  }
  
  .slider:before {
    background-color: ${({ theme }) => theme.linkActive};
  }
  
  input:checked + .slider {
    background-color: ${({ theme }) => theme.toggleBg};
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px ${({ theme }) => theme.shadow};
  }

  .typing{
    color:  ${({ theme }) => theme.linkActive}
  }
  
  /****** menu colors ******/

.menu{
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.bg};
}

.tools > .tool {
  border-bottom:1px solid ${({ theme }) => theme.lightenMain};
}

.return{
  border:.2em solid ${({ theme }) => theme.main};
  /* background-color: ${({ theme }) => theme.aux}; */
}

.tool > .icon{
  fill: ${({ theme }) => theme.buttonColor};
}

.tool:hover{
  background-color: ${({ theme }) => theme.lightenMain};
}

  /***** details colors *****/
  a {
    color:  ${({ theme }) => theme.main};
  }
 
  .detail {
    background-color:  ${({ theme }) => theme.bg};
  }

  .count{
    color:  ${({ theme }) => theme.text};
  }

  .invite{
    border: 1px solid ${({ theme }) => theme.main};
  }

  .invite:hover{
    opacity:.5;
  }

  .invite > span{
    color:  ${({ theme }) => theme.main};
  }

  .invite > .icon{
    stroke:  ${({ theme }) => theme.main};
    fill:  ${({ theme }) => theme.main};
  }

  .detail > .header{
    color: ${({ theme }) => theme.text};
    border-bottom:.1em solid  ${({ theme }) => theme.lightenMain};
  }

  .invite{
    background-color: transparent;
    color: ${({ theme }) => theme.text}
  }

  .users > .item {
    background-color: ${({ theme }) => theme.itemBg};
    box-shadow: 0px 1px 2px  ${({ theme }) => theme.shadow};   
  }

  .attachments{
    border:1px solid  ${({ theme }) => theme.lightenMain};
  }
  
  .sections > button {
    background: transparent;
    border-bottom:1px solid  ${({ theme }) => theme.aux};
    color:  ${({ theme }) => theme.main};
  }

  .sections > button:hover, button:active{
    background-color:  ${({ theme }) => theme.linkActiveBg};
    color: ${({ theme }) => theme.linkActive};
  }

  .sections > button:focus{
    background-color:  ${({ theme }) => theme.linkActiveBg};
    border-bottom:1px solid  ${({ theme }) => theme.linkActive};
    color: ${({ theme }) => theme.linkActive};
  }

   
  /***** input colors ******/
  .form {
    background: ${({ theme }) => theme.formBg};
    border:1px solid ${({ theme }) => theme.bg};
  }

  .input {
    color: ${({ theme }) => theme.inputColor};
    background-color: ${({ theme }) => theme.inputBg};
    border:1px solid ${({ theme }) => theme.aux};

  }

  .button {
    background: transparent;
  }
  
  .fileLabel > svg, .button > svg  {
    stroke: ${({ theme }) => theme.main} !important;
    fill: ${({ theme }) => theme.main}!important;
  }

  /***** message colors ******/

  .messageBox {
    background:  ${({ theme }) => theme.messageBox};
    color:  ${({ theme }) => theme.message};
  }
  
  .sentText {
    color:  ${({ theme }) => theme.main};
  }

  .userMessage{
    background: ${({ theme }) => theme.userMessageBg};
    box-shadow: .3em .3em .5em ${({ theme }) => theme.messageShadow};
  }

  .userMessage > .messageText {
    color: ${({ theme }) => theme.white}
  }
  
  .otherMessage {
    background: ${({ theme }) => theme.otherMessageBg};
    box-shadow: .3em .3em .5em ${({ theme }) => theme.messageShadow};
  }

  .otherMessage > .messageText {
    color: ${({ theme }) => theme.otherMessage}
  }
    
  .systemMessage {
    background: ${({ theme }) => theme.systemMsgBg};
    box-shadow: .3em .3em .5em ${({ theme }) => theme.messageShadow};
  }

  .systemMessage > .messageText {
    color: ${({ theme }) => theme.text}
  }

  .time{
    color: ${({ theme }) => theme.main};
  }
  
  `