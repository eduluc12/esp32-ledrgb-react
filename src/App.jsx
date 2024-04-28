import mqtt from 'mqtt';
import { useState } from 'react';
import { useEffect } from 'react';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import './App.css'

function App() {
  const [color, setColor] = useColor("#561ecb");
  const [mqttConnection, setMqttConnection] = useState();

  useEffect(() => {
    async function openConnection(){
      console.log("trying to connect ...");
      const connection = await mqtt.connectAsync("ws://localhost:8083/mqtt");
      setMqttConnection(connection);
    }
    openConnection();
  }, []);

  return (
    <>
      <ColorPicker color={color} onChange={(value) => {
        const {
          r,
          g,
          b
        } = value.rgb;
        mqttConnection.publish("rgb", JSON.stringify({
          r: Math.floor(r),
          g: Math.floor(g),
          b: Math.floor(b),
        }));
        console.log(value.rgb);
        setColor(value);
      }} />
    </>
  );
}

export default App
