
import {SearchElement} from "../SearchElement/SearchElement";


  // ------------------------------ Search Function ----------------------------------

  
  const [searchTerm, setSearchTerm] = useState(""); // State for search term


  useEffect(() => {
    const filtered = followupList.filter((lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.mobileNo.includes(searchTerm)
    );
    setFilteredLeads(filtered);
  }, [searchTerm, followupList]);



    {/* SEARCH DROPDOWN */}
    <SearchElement value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

