import { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { tenant_base_url, protocal_url } from "../../../../Config/config";

export default function Createlead() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [description, setdescription] = useState("Add Text Here");
  const [editLead, seteditLead] = useState({ language: "" });

  const fullURL = window.location.href;
  const url = new URL(fullURL);
  const name = url.hostname.split(".")[0];

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      handleLead(); // Fetch lead data for editing
    }
  }, [id]);

  async function handleLead() {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Lead/lead/${id}`,
        config
      );
      const data = response.data.data;
      setdescription(data.description);
      seteditLead({ language: data.language || "" });
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          "Content-Type": "application/json",
        },
      };
      const formData_PUT = { language: editLead.language };
      const formData_POST = { language: editLead.language };

      if (isEditMode) {
        await axios.put(
          `${protocal_url}${name}.${tenant_base_url}/Lead/lead/update`,
          formData_PUT,
          config
        );
        alert("Lead updated successfully!");
        navigate(`/sidebar/lead`);
      } else {
        await axios.post(
          `${protocal_url}${name}.${tenant_base_url}/Lead/lead/add`,
          formData_POST,
          config
        );
        alert("Lead created successfully!");
        navigate(`/sidebar/lead`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  //----------------------------------------------------------------------------------------
  //LanguageDropDown

  const LanguageDropDown = [
    { key: 1, name: "English" },
    { key: 2, name: "Portuguese" },
    { key: 3, name: "Hindi" },
    { key: 4, name: "Arabic" },
    { key: 5, name: "Japanese" },
  ];

  const [defaultTextLanguageDropDown, setDefaultTextLanguageDropDown] =
    useState("Select Language");
  const [isDropdownVisibleLanguage, setisDropdownVisibleLanguage] =
    useState(false);

  const toggleDropdownLanguage = () => {
    setisDropdownVisibleLanguage(!isDropdownVisibleLanguage);
  };

  const handleDropdownLanguage = (language) => {
    setDefaultTextLanguageDropDown(language);
    setisDropdownVisibleLanguage(false);
    seteditLead((prevTask) => ({
      ...prevTask,
      language: language,
    }));
  };

  return (
    <>
      <div className="min-h-screen flex flex-col mt-3">
        <form onSubmit={handleSubmit} className="flex mb-6">
          <div className="w-full">
            <div className="mx-3 bg-white rounded-xl shadow-md ">
              <div className="grid gap-2 p-2">
                <div className="flex space-x-4 ">
                  <div className="flex flex-col w-1/2 relative">
                    <label
                      htmlFor="language"
                      className="text-sm font-medium text-gray-700"
                    >
                      Language
                    </label>
                    <div className="relative" onClick={toggleDropdownLanguage}>
                      <button
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                        id="LanguageDropDown"
                        type="button"
                      >
                        {!isEditMode
                          ? defaultTextLanguageDropDown
                          : editLead.language === ""
                          ? defaultTextLanguageDropDown
                          : editLead.language}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {isDropdownVisibleLanguage && (
                        <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                          <ul className="py-2 text-sm text-gray-700">
                            {LanguageDropDown.map(({ key, name }) => (
                              <li
                                key={key}
                                onClick={() => handleDropdownLanguage(name)}
                                className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                              >
                                {name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
