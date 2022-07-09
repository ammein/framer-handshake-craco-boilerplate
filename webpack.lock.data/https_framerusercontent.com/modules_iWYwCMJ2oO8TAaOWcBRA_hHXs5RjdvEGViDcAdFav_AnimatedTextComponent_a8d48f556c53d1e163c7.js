import{jsx as _jsx}from"react/jsx-runtime";// Welcome to Code in Framer
// Get Started: https://www.framer.com/docs/guides/
import{MotionConfig}from"framer-motion";import{addPropertyControls,ControlType}from"framer";import{useEffect,useState,useRef}from"react";import WavyText from"https://framerusercontent.com/modules/wBE6CvHnLVPSoOT0l9Kc/5nVA7CsRje4moFqWwJIr/WavyText.js";/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/docs/guides/auto-sizing
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */ export default function AnimatedTextComponent(props){// This is a React component containing an Example component
// - Replace <Example /> with your own code
// - Find inspiration: https://www.framer.com/developers/
const[replay,setReplay]=useState(false);const[text,setText]=useState("");const sentence={hidden:{opacity:1},visible:{opacity:1,transition:{delay:.5,staggerChildren:.08}}};const generatorRand=useRef(null);useEffect(()=>{let timer=null;if(!replay){timer=setTimeout(()=>{setReplay(!replay);},props.delayBeforeAnimation*1e3);}return()=>{clearTimeout(timer);};},[replay]);useEffect(()=>{generatorRand.current=new randomGenerator(0,props.text.length-1);var index=generatorRand.current.get();var currentText=props.text[index];setText(currentText);setReplay(true);},[]);return /*#__PURE__*/ _jsx(MotionConfig,{children:/*#__PURE__*/ _jsx(WavyText,{text:text,replay:replay,overrideStyle:{fontSize:props.fontSize,color:props.fontColor},onAnimationComplete:definition=>{var currentText="";if(definition==="visible"){setTimeout(()=>setReplay(false),props.delayDuration*1e3);}if(definition==="hidden"){var index=generatorRand.current.get();currentText=props.text[index];setText(currentText);}},duration:props.duration})});};const containerStyle={margin:"0 auto",padding:"40px",maxWidth:"960px"};AnimatedTextComponent.defaultProps={text:["Lorem Ipsum","Test 2"]};addPropertyControls(AnimatedTextComponent,{text:{type:ControlType.Array,control:{type:ControlType.String},title:"Title of Text"},fontColor:{type:ControlType.Color,title:"Font Color",defaultValue:"#e7c7b7"},fontSize:{type:ControlType.Number,title:"Font Size",defaultValue:24},duration:{type:ControlType.Number,title:"Duration Each Text Animation",defaultValue:.15},delayDuration:{type:ControlType.Number,title:"Delay After Animation",defaultValue:2},delayBeforeAnimation:{type:ControlType.Number,title:"Delay Before Animation",defaultValue:1}});function randomGenerator(low,high){if(arguments.length<2){high=low;low=0;}this.low=low;this.high=high;this.reset();}randomGenerator.prototype={reset:function(){this.remaining=[];for(var i=this.low;i<=this.high;i++){this.remaining.push(i);}},get:function(){if(!this.remaining.length){this.reset();}var index=Math.floor(Math.random()*this.remaining.length);var val=this.remaining[index];this.remaining.splice(index,1);return val;}};
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"AnimatedTextComponent","slots":[],"annotations":{"framerContractVersion":"1","framerSupportedLayoutWidth":"any","framerSupportedLayoutHeight":"any"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./AnimatedTextComponent.map