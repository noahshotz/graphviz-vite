import { NextUIProvider, Select, SelectItem, SharedSelection } from "@nextui-org/react";
import { Graphviz } from "./components/Graphviz";
import { Navbar } from "./components/Navbar";
import { useState } from "react";
import { examplesData } from "./data/dot";
import { engines, examples } from "./data/const";
import { BiChart, BiChip } from "react-icons/bi";


function App() {

  const [example, setExample] = useState<string | null>(null);
  const handleSelectChange = (keys: SharedSelection) => {
    const selectedKey = Array.isArray(keys) ? keys[0] : keys.anchorKey || keys.currentKey;
    const selectedExample = examplesData[selectedKey];
    setExample(selectedExample || null);
  };

  const [engine, setEngine] = useState<string | null>(null);
  const handleEngineChange = (keys: SharedSelection) => {
    // Extract the selected key from SharedSelection
    const selectedKey = Array.isArray(keys) ? keys[0] : keys.anchorKey || keys.currentKey;
    setEngine(selectedKey || null);
  };

  return (
    <NextUIProvider>
      <main className="bg-white w-full h-screen flex flex-row">

        {/* Navbar with menu options */}
        <Navbar>
          <Select
            label="Presets"
            placeholder="Preset auswählen"
            size="sm"
            startContent={<BiChart size={20} />}
            onSelectionChange={handleSelectChange}
          >
            {examples.map((example) => (
              <SelectItem key={example.key}>{example.label}</SelectItem>
            ))}
          </Select>
          <Select
            label="Layout engine"
            placeholder="Engine auswählen"
            size="sm"
            startContent={<BiChip size={20} />}
            onSelectionChange={handleEngineChange}
            defaultSelectedKeys={["dot"]}
          >
            {engines.map((engine) => (
              <SelectItem key={engine.key}>{engine.label}</SelectItem>
            ))}
          </Select>
        </Navbar>

        {/* Code editor and Graphviz display */}
        <Graphviz dot={example} engine={engine} />
      </main>
    </NextUIProvider>
  );
}

export default App;