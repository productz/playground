const GL = require("gl-react");
const React = require("react");

const shaders = GL.Shaders.create({
  helloGL: {
    frag: `
precision highp float;
varying vec2 uv;
uniform float blue;
void main () {
  gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
}`
  }
});

export default GL.createComponent(
  ({ blue }) =>
  <GL.Node
    shader={shaders.helloGL}
    uniforms={{ blue }}
  />,
  { displayName: "HelloGL" });