import React, { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import OutputDataContext from "../contexts/OutputDataContext";
import CsvDownloadButton from "react-json-to-csv"
import { Link } from "react-router-dom";

const FadeInAnimation = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0;
  }

  to {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%;
  grid-template-rows: 70px 70px 70px 600px calc(100% - 810px);
`;

const DownloadCSVContainer = styled.div`
  grid-column: 7 / 8;
  grid-row: 2 / 3;
  display: flex;
  align-items: center;
  justify-content: right;
`;

const Table = styled.div`
  grid-column: 2 / 8;
  grid-row: 3 / 4;
  display: flex;
  box-sizing: border-box;
  font-family: "Roboto";
  font-size: 16px;
  border-right: 5px solid orange;
  border-left: 5px solid orange;
`;

const LabelContainer = styled.div`
  width: calc(100% / 6);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto";
  font-weight: bold;
  font-size: 14px;
  color: black;
  flex-direction: column;
  border-top: 0.5px solid lightgray;
  border-right: ${(props) =>
    props.id === 5 ? "0.5px solid white" : "0.5px solid lightgray"};
`;

const Label = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 20px;
  box-sizing: border-box;
`;

const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 20px;
  box-sizing: border-box;
`;

const Tag = styled.button`
  width: auto;
  height: 30px;
  padding: 0;
  margin-right: 5px;
  display: flex;
  border: none;
  align-items: center;
  justify-content: left;
  color: ${(props) => (props.isClicked ? "orange" : "black")};
  font-family: "Roboto";
  font-size: 20px;
  background-color: transparent;
  transition: 0.2s all;
  user-select: none;
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
  }
`;

const SearchContainer = styled.div`
  width: auto;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: ${(props) => (props.isClicked ? "70px" : "0")};
  height: 25px;
  border: ${(props) =>
    props.isClicked ? "1px solid black" : "1px solid transparent"};
  border-radius: 5px;
  outline: none;
  margin-left: 5px;
  padding-left: ${(props) => (props.isClicked ? "5px" : "0")};
  transition: 0.5s;
`;

const ResultsContainer = styled.div`
  grid-column: 2 / 8;
  grid-row: 4 / 5;
  overflow-y: auto;
  position: relative;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Row = styled.div`
  width: 100%;
  height: ${props => props.rowHeight}px;
  box-sizing: border-box;
  background-color: ${(props) => props.bgColor};
  font-family: "Roboto";
  display: flex;
  opacity: 1;
  /* animation: ${FadeInAnimation} 1s ease forwards;
  animation-delay: ${(props) => props.idx * 0.1}s; */
  border-right: 5px solid orange;
  border-left: 5px solid orange;
`;

const Data = styled.div`
  width: calc(100% / 6);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  color: black;
  font-size: 14px;
  box-sizing: border-box;
  font-family: "Roboto";
  border-right: 0.5px solid lightgray;
  padding: 0 20px;
`;

const InlineRow = styled.div`
  width: calc(100% / 6);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  color: black;
  font-size: 14px;
  box-sizing: border-box;
  font-family: "Roboto";
`;

const InlineData = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: left;
  color: black;
  font-size: 14px;
  box-sizing: border-box;
  font-family: "Roboto";
  border-right: 0.5px solid lightgray;
  border-bottom: 0.5px solid lightgray;
  background-color: ${(props) => props.bgColor};
  padding: 0 20px;
`;

const Letter = styled.span`
  width: ${(props) => (props.idx === 7 ? "5px" : "2px")};
  flex: ${(props) => (props.idx === 7 ? "2" : "1")};
  font-size: ${(props) => (props.idx === 7 ? "40px" : "12px")};
  color: ${(props) => (props.idx === 7 ? "gray" : "black")};
  margin: ${(props) => (props.idx === 7 ? "0 3px 0 3px" : "0")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto";
  &:hover {
  }
`;

const StyledCsvDownloadButton = styled(CsvDownloadButton)`
  width: 160px;
  height: 30px;
  border: 2px solid orange;
  color: black;
  background-color: white;
  font-size: 14px;
  transition: 0.2s all;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: orange;
  }
`;

const Pagination = styled.div`
  grid-column: 5 / 8;
  grid-row: 5 / end;
  width: auto;
  height: 40px;
  margin: 10px 0 10px 0;
  box-sizing: border-box;
  transition: 0.2s all;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const PaginationButton = styled.button`
  width: 45px;
  min-width: 30px;
  height: 30px;
  margin: 2px;
  box-sizing: border-box;
  border: 0.5px solid orange;
  color: black;
  background-color: ${(props) => (props.disabled ? "orange" : "white")};
  font-size: 14px;
  transition: 0.2s all;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 2px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: orange;
  }
`;

const PaginationButtonLeft = styled.button`
  width: 30px;
  min-width: 30px;
  height: 30px;
  margin: 2px;
  box-sizing: border-box;
  border: 2px solid orange;
  color: black;
  background-color: ${(props) => (props.disabled ? "orange" : "white")};
  font-size: 14px;
  transition: 0.2s all;
  position: absolute;
  right: 97px;
  bottom: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: white;
    background-color: orange;
  }
`;

const PaginationButtonRight = styled.button`
  width: 30px;
  min-width: 30px;
  height: 30px;
  margin: 2px;
  box-sizing: border-box;
  border: 2px solid orange;
  color: black;
  background-color: ${(props) => (props.disabled ? "orange" : "white")};
  font-size: 14px;
  transition: 0.2s all;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: white;
    background-color: orange;
  }
`;

const DropDownContainer = styled.div`
  display: flex;
  max-height: auto;
  border: 1px solid orange;
  z-index: 99;
  backdrop-filter: blur(5px);
  position: absolute;
  bottom: 0;
  right: 40px;
`;

const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PredCountDiv = styled.div`
  grid-row: 5/5;
  grid-column: 2/5;
  padding: 2px;
  margin-top: 10px;
  font-family: 'Roboto';
`
const Output = () => {
  const { outputData } = useContext(OutputDataContext);
  const getRowKey = (item, idx) => `${idx}-${sortOrder.sortBy}`;
  const [searchClicked, setSearchClicked] = useState("");
  const [filteredList, setFilteredList] = useState(outputData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredList.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredList.length / rowsPerPage);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [sortOrder, setSortOrder] = useState({
    sortBy: "",
    ascending: true,
  });

  const searchContainerRefs = {
    GeneID: useRef(null),
    Position: useRef(null),
    Phosphate: useRef(null),
    Kinase: useRef(null),
    KinaseFamily: useRef(null),
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedInsideInput = false;
      Object.values(searchContainerRefs).forEach((ref) => {
        if (ref.current && ref.current.contains(event.target)) {
          if (
            event.target.tagName === "INPUT" &&
            event.target.type === "text"
          ) {
            clickedInsideInput = true;
          }
        }
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setDropdownOpen(false);
        }
      });

      if (!clickedInsideInput) {
        setSearchClicked("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRefs]);

  const uniprotIdRegexPattern = "[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2}";
  const uniprotIdRegex = new RegExp(uniprotIdRegexPattern);


  const handleSort = (sortBy) => {
    if (sortOrder.sortBy === sortBy) {
      setSortOrder({
        sortBy,
        ascending: !sortOrder.ascending,
      });
    } else {
      setSortOrder({
        sortBy,
        ascending: true,
      });
    }
  };

  const handleSearchClick = (type) => {
    setSearchClicked(type);
  };

  const handleSearch = (e, type) => {
    let filteredList = [];
    let text = e.target.value;
    console.log(text);
    if (type === "GeneID") {
      outputData.forEach((item) => {
        console.log(item);
        if (text === "") {
          filteredList.push(item);
        } else if (
          item.geneId.toString().toLowerCase().includes(text.toLowerCase())
        ) {
          filteredList.push(item);
        }
      });
      setFilteredList(filteredList);
      setCurrentPage(1);
    }
    if (type === "Position") {
      outputData.forEach((item) => {
        console.log(item);
        if (text === "") {
          filteredList.push(item);
        } else if (
          item.position.toString().toLowerCase().startsWith(text.toLowerCase())
        ) {
          filteredList.push(item);
        }
      });
      setFilteredList(filteredList);
      setCurrentPage(1);
    }
    if (type === "Phosphate") {
      outputData.forEach((item) => {
        console.log(item);
        if (text === "") {
          filteredList.push(item);
        } else if (
          item.proteinSeq.toString().toLowerCase().includes(text.toLowerCase())
        ) {
          filteredList.push(item);
        }
      });
      setFilteredList(filteredList);
      setCurrentPage(1);
    }
    if (type === "Kinase") {
      outputData.forEach((item) => {
        console.log(item);
        if (text === "") {
          filteredList.push(item);
        } else {
          item.probKinase.forEach((inlineitem) => {
            if (
              inlineitem.toString().toLowerCase().includes(text.toLowerCase())
            ) {
              filteredList.push(item);
            }
          });
        }
      });
      setFilteredList(filteredList);
      setCurrentPage(1);
    }
    if (type === "KinaseFamily") {
      outputData.forEach((item) => {
        console.log(item);
        if (text === "") {
          filteredList.push(item);
        } else {
          item.kinaseFamily.forEach((inlineitem) => {
            if (
              inlineitem.toString().toLowerCase().includes(text.toLowerCase())
            ) {
              filteredList.push(item);
            }
          });
        }
      });
      setFilteredList(filteredList);
      setCurrentPage(1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Container>
      <DownloadCSVContainer>
        <StyledCsvDownloadButton
          data={outputData}
          filename="deepkinzero-output.csv"
        >
          Download CSV <i class="bi bi-box-arrow-down"></i>
        </StyledCsvDownloadButton>
      </DownloadCSVContainer>

      <Table></Table>
      <Table>
        <LabelContainer id={0}>
          <Label>ID</Label>
          <OptionsContainer ref={searchContainerRefs.GeneID}>
            {" "}
            <Tag
              isClicked={sortOrder.sortBy === "geneID"}
              onClick={() => handleSort("geneID")}
            >
              {sortOrder.ascending && sortOrder.sortBy === "geneID" ? (
                <i class="bi bi-sort-alpha-up"></i>
              ) : (
                <i class="bi bi-sort-alpha-down"></i>
              )}
            </Tag>
            <SearchContainer>
              <Tag
                style={{ fontSize: "16px", margin: 0, padding: 0 }}
                onClick={() => handleSearchClick("GeneID")}
              >
                <i class="bi bi-search"></i>
              </Tag>
              <SearchInput
                autoFocus
                placeholder="Search..."
                isClicked={searchClicked === "GeneID"}
                type="text"
                onChange={(e) => handleSearch(e, "GeneID")}
              />
            </SearchContainer>
          </OptionsContainer>
        </LabelContainer>
        <LabelContainer id={1}>
          <Label> Position </Label>
          <OptionsContainer ref={searchContainerRefs.Position}>
            {" "}
            <Tag
              isClicked={sortOrder.sortBy === "position"}
              onClick={() => handleSort("position")}
            >
              {sortOrder.ascending && sortOrder.sortBy === "position" ? (
                <i class="bi bi-sort-up"></i>
              ) : (
                <i class="bi bi-sort-down"></i>
              )}
            </Tag>
            <SearchContainer>
              <Tag
                style={{ fontSize: "16px", margin: 0, padding: 0 }}
                onClick={() => handleSearchClick("Position")}
              >
                <i class="bi bi-search"></i>
              </Tag>
              <SearchInput
                placeholder="Search..."
                isClicked={searchClicked === "Position"}
                type="text"
                onChange={(e) => handleSearch(e, "Position")}
              />
            </SearchContainer>
          </OptionsContainer>
        </LabelContainer>
        <LabelContainer id={2}>
          <Label> Phosphosite (+-7) </Label>
          <OptionsContainer ref={searchContainerRefs.Phosphate}>
            {" "}
            <SearchContainer>
              <Tag
                style={{ fontSize: "16px" }}
                onClick={() => handleSearchClick("Phosphate")}
              >
                <i class="bi bi-search"></i>
              </Tag>
              <SearchInput
                placeholder="Search..."
                isClicked={searchClicked === "Phosphate"}
                type="text"
                onChange={(e) => handleSearch(e, "Phosphate")}
              />
            </SearchContainer>
          </OptionsContainer>
        </LabelContainer>

        <LabelContainer id={3}>
          <Label> Probable Kinase </Label>
          <OptionsContainer ref={searchContainerRefs.Kinase}>
            <SearchContainer>
              <Tag
                style={{ fontSize: "16px", margin: 0, padding: 0 }}
                onClick={() => handleSearchClick("Kinase")}
              >
                <i class="bi bi-search"></i>
              </Tag>
              <SearchInput
                placeholder="Search..."
                isClicked={searchClicked === "Kinase"}
                type="text"
                onChange={(e) => handleSearch(e, "Kinase")}
              />
            </SearchContainer>
          </OptionsContainer>
        </LabelContainer>
        <LabelContainer id={4}>
          <Label> Kinase Family </Label>
          <OptionsContainer ref={searchContainerRefs.KinaseFamily}>
            {" "}
            <SearchContainer>
              <Tag
                style={{ fontSize: "16px", margin: 0, padding: 0 }}
                onClick={() => handleSearchClick("KinaseFamily")}
              >
                <i class="bi bi-search"></i>
              </Tag>
              <SearchInput
                placeholder="Search..."
                isClicked={searchClicked === "KinaseFamily"}
                type="text"
                onChange={(e) => handleSearch(e, "KinaseFamily")}
              />
            </SearchContainer>
          </OptionsContainer>
        </LabelContainer>
        <LabelContainer id={5}>
          <Label> Probability </Label>
          <OptionsContainer>
            {" "}
            <Tag></Tag>
          </OptionsContainer>
        </LabelContainer>
      </Table>
      <ResultsContainer>
        {currentRows
          .sort((a, b) => {
            if (sortOrder.sortBy === "position") {
              return sortOrder.ascending
                ? parseFloat(a.position) - parseFloat(b.position)
                : parseFloat(b.position) - parseFloat(a.position);
            }
            if (sortOrder.sortBy === "geneID") {
              return sortOrder.ascending
                ? a.geneId.localeCompare(b.geneId)
                : b.geneId.localeCompare(a.geneId);
            }

            return 0;
          })
          .map((item, idx) => (
            <Row
              key={getRowKey(item, idx)}
              idx={idx}
              bgColor={idx % 2 === 0 ? "#ffa60045" : "#ffa60026"}
              rowHeight={40 * (15 / rowsPerPage)}
            >
              <Data>
                {uniprotIdRegex.test(item.geneId)
                  ? <Link to={`https://www.uniprot.org/uniprotkb/${item.geneId}/entry`} target="_blank">{item.geneId}</Link>
                  : item.geneId}
              </Data>
              <Data>{item.position}</Data>
              <Data>
                {item.proteinSeq.split("").map((letter, idx) => (
                  <Letter key={idx} idx={idx}>
                    {letter}
                  </Letter>
                ))}
              </Data>
              <InlineRow>
                {" "}
                {item.probKinase.slice(0, 15 / rowsPerPage).map((probKinase) => {
                  return <InlineData>
                    <Link to={`https://www.uniprot.org/uniprotkb/${probKinase}/entry`} target="_blank">
                      {probKinase}
                    </Link>
                  </InlineData>;
                })}
              </InlineRow>
              <InlineRow>
                {" "}
                {item.kinaseFamily.slice(0, 15 / rowsPerPage).map((kinaseFamily) => {
                  return <InlineData>{kinaseFamily}</InlineData>;
                })}
              </InlineRow>

              <InlineRow>
                {" "}
                {item.probability.slice(0, 15 / rowsPerPage).map((probability) => {
                  return (
                    <InlineData>
                      {probability.toFixed(3).replace(/\.?0+$/, "")}
                    </InlineData>
                  );
                })}
              </InlineRow>
            </Row>
          ))}
      </ResultsContainer>
      <PredCountDiv>
        Show top&nbsp;
        <select onChange={e => { setRowsPerPage(15 / e.target.value); setCurrentPage(1); }}>
          <option value={1}>1</option>
          <option value={3}>3</option>
          <option value={5}>5</option>
        </select>
        &nbsp;prediction(s) for each phosphosite
      </PredCountDiv>
      <Pagination>
        <PaginationButtonLeft
          onClick={handlePrevClick}
          type={"Previous"}
          style={{ display: currentPage === 1 ? "none" : "block" }}
        >
          <i class="bi bi-chevron-left"></i>
        </PaginationButtonLeft>
        <DropDownContainer ref={dropdownRef}>
          {!dropdownOpen && (
            <PaginationButton onClick={toggleDropdown}>
              {currentPage}
              {!dropdownOpen && (
                <i style={{ fontSize: "10px" }} class="bi bi-chevron-down"></i>
              )}
            </PaginationButton>
          )}
          {dropdownOpen && (
            <DropDown>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationButton
                    key={page}
                    onClick={() => handlePageClick(page)}
                    disabled={currentPage === page}
                  >
                    {page}
                  </PaginationButton>
                )
              )}
            </DropDown>
          )}
        </DropDownContainer>
        <PaginationButtonRight
          onClick={handleNextClick}
          type={"Next"}
          style={{ display: currentPage === totalPages ? "none" : "block" }}
        >
          <i class="bi bi-chevron-right"></i>
        </PaginationButtonRight>
      </Pagination>
    </Container>
  );
};

export default Output;
