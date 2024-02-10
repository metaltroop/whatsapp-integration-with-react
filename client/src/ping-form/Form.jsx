import { useState } from "react";

const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        message: "",
        phone: "",
      });
    
      const [sheetsize, setsheetsize] = useState("");
      const [sheetType, setsheetType] = useState("");
      const [isFrame, setIsFrame] = useState("");
      const [sketchType, setsketchType] = useState("");
      const [ColorType, setColorType] = useState("");
      const [estAmount, setestAmount] = useState(0);
      const [FormType, setFormType] = useState("normal");
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:3001/message', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              phoneNumber: formData.phone,
              message: `
Name: ${formData.name}
Message: ${formData.message}
Phone: ${formData.phone}
Sheet Size: ${sheetsize}
Sheet Type: ${sheetType}
Is Frame: ${isFrame}
Sketch Type: ${sketchType}
Color Type: ${ColorType}
Estimate Amount: ${estAmount}
              `,
            }),
          });
    
          if (response.ok) {
            console.log('Message sent successfully');
            alert('Check WhatsApp');
            setFormData({
              name: "",
              message: "",
              phone: "",
            });
            setsheetsize("");
            setsheetType("");
            setIsFrame("");
            setsketchType("");
            setColorType("");
            setestAmount(0);
            setFormType("normal");
          } else {
            console.error('Error sending message:', response.statusText);
          }
        } catch (error) {
          console.error('Error sending message:', error);
        }
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name:
        </label>
        <input
          className="border rounded w-full py-2 px-3"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
          Message:
        </label>
        <textarea
          className="border rounded w-full py-2 px-3"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
          Phone Number:
        </label>
        <input
          className="border rounded w-full py-2 px-3"
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="Size">Size</label>
        <div className="w-[500px] bg-slate-50 p-5 rounded-xl shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] ">
          <select
            id="Size"
            className="border-none outline-none bg-transparent w-[100%]"
            onChange={(e) => {
              if (sheetsize === "") {
                setestAmount((prev) => prev + 1);
                setsheetsize(e.target.value);
              } else {
                setsheetsize(e.target.value);
              }
              setsheetsize(e.target.value);
            }}
            disabled={FormType !== "normal"}
          >
            <option selected value>
              Choose Size
            </option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="A3">A3</option>
            <option value="A4">A4</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex gap-10">
          <div className="flex gap-2 text-xl">
            <input
              id="radio1"
              type="radio"
              disabled={FormType !== "normal"}
              onChange={(e) => {
                if (e.target.checked && sheetType === "") {
                  setestAmount((prev) => prev + 1);
                  setsheetType("Sheet");
                } else if (e.target.checked && sheetType !== "") {
                  setsheetType("Sheet");
                } else {
                  setsheetType("");
                }
              }}
              name="radio"
              className=""
            />
            <label htmlFor="radio1" className="">
              Sheet
            </label>
          </div>
          <div className="flex gap-2 text-xl">
            <input
              id="radio2"
              type="radio"
              disabled={FormType !== "normal"}
              onChange={(e) => {
                if (e.target.checked && sheetType === "") {
                  setestAmount((prev) => prev + 1);
                  setsheetType("Canvas");
                } else if (e.target.checked && sheetType !== "") {
                  setsheetType("Canvas");
                } else {
                  setsheetType("");
                }
              }}
              name="radio"
              className=""
            />
            <label htmlFor="radio2" className="">
              Canvas
            </label>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="flex gap-4">
          <input
            type="checkbox"
            name="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setestAmount((prev) => prev + 1);
                setIsFrame("yes");
              } else {
                setestAmount((prev) => prev - 1);
                setIsFrame("No");
              }
            }}
            disabled={FormType !== "normal"}
            className=""
          />
          <span className="">Frame*</span>
        </label>
      </div>

      <div className="mb-4">
        <label htmlFor="">Sketch Type</label>
        <div className="w-[500px] bg-slate-50 p-5 rounded-xl shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
          <select
            className="border-none outline-none bg-transparent w-[100%]"
            onChange={(e) => {
              if (sketchType === "") {
                setestAmount((prev) => prev + 1);
                setsketchType(e.target.value);
              } else {
                setsketchType(e.target.value);
              }
              setsketchType(e.target.value);
            }}
            disabled={FormType !== "normal"}
          >
            <option selected value>
              Choose Type
            </option>
            <option value="Sketch">Sketch</option>
            <option value="Coloured">Coloured</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="">Color Type</label>
        <div className="w-[500px] bg-slate-50 p-5 rounded-xl shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
          <select
            className="border-none outline-none bg-transparent w-[100%] "
            onChange={(e) => {
              if (ColorType === "") {
                setestAmount((prev) => prev + 1);
                setColorType(e.target.value);
              } else {
                setColorType(e.target.value);
              }
            }}
            disabled={FormType !== "normal"}
          >
            <option selected value>
              Choose Type
            </option>
            <option value="Pencil Color">Pencil Color</option>
            <option value="Acrylic color">Acrylic color</option>
            <option value="Oil pastel">Oil pastel</option>
            <option value="Water Colors">Water Colors</option>
          </select>
        </div>
      </div>

      <div className="flex justify-evenly items-center w-[100%] ">
        <button className="w-36 h-10 bg-blue-600 text-white font-normal rounded-lg" type="submit">
          Submit
        </button>

        <div className="text-xl font-semibold ">
          <div className="">
            Estimate Price:
            <span className=""> $ {estAmount}</span>{" "}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
