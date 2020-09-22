
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
    background-color: ${({ theme }) => theme.aux};
  }
  
  .slider:before {
    background-color: white;
  }
  
  input:checked + .slider {
    background-color: ${({ theme }) => theme.main};
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px ${({ theme }) => theme.shadow};
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
  fill: ${({ theme }) => theme.main};
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
    color:  ${({ theme }) => theme.main};
  }

  .detail > .header{
    border-bottom:.1em solid  ${({ theme }) => theme.lightenMain};
  }

  .invite{
    background-color: transparent;
    color: ${({ theme }) => theme.text}
  }

  .users > .item {
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
    background-color:  ${({ theme }) => theme.lightenMain};
  }

  .sections > button:focus{
    background-color:  ${({ theme }) => theme.lightenMain};
    border-bottom:1px solid  ${({ theme }) => theme.main};
  }

   
  /***** input colors ******/
  .form {
    background: ${({ theme }) => theme.formBg};
    border:1px solid ${({ theme }) => theme.bg};
  }

  .input {
    background-color: ${({ theme }) => theme.inputBg};
    border:1px solid ${({ theme }) => theme.aux};

  }

  .button {
    background: transparent;
  }
  
  .button > svg  {
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

  .colorWhite {
    color:  ${({ theme }) => theme.message};
  }
  
  .colorDark {
    color:  ${({ theme }) => theme.text};
  }

  .backgroundDark{
    background:  ${({ theme }) => theme.main};
    box-shadow: .3em .3em .5em  ${({ theme }) => theme.messageShadow};
  }
  
  .userMessage{
    background: ${({ theme }) => theme.main};
    box-shadow: .3em .3em .5em ${({ theme }) => theme.messageShadow};
  }

  .userMessage > .messageText {
    color: ${({ theme }) => theme.message}
  }
  
  .otherMessage {
    background: #fff;
    box-shadow: .3em .3em .5em ${({ theme }) => theme.messageShadow};
  }

  .otherMessage > .messageText {
    color: ${({ theme }) => theme.text}
  }
    
  .systemMessage {
    background: transparent;
    box-shadow: .3em .3em .5em ${({ theme }) => theme.messageShadow};
  }

  .systemMessage > .messageText {
    color: ${({ theme }) => theme.text}
  }

  .time{
    color: ${({ theme }) => theme.main};
  }
  
  `