import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CarCard from "../../components/CarCard/CarCard";
import { useQuery } from "../../hooks/useQuery";
import { CarDetails } from "../../models/CarDetails";
import { carTypeList } from "../../models/CarType";
import { getCars, getMoreCars, resetCars } from "../../redux/store/cars/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import sademoji from "../../assets/sad-emoji.svg";
import "./CarsList.scss";
import Loader from "../../components/Loader/Loader";
import EndMessage from "../../components/EndMessage/EndMessage";

function CarsList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const [carType, setCarType] = useState<number>(3);
  const cars: any = useSelector((state: any) => state.cars.cars);
  const searchtext = query.get("search-text");
  const [carNameToBeSearched, setCarNameToBeSearched] = useState(searchtext === null ? "" : searchtext);
  const { from }: any = location.state == null ? "" : (location.state as any);
  
  useEffect(() => {
    document.title = "Xtreme Cars | All Cars";
    let params = query?.get("car-type");
    switch (params) {
      case "sedan":
        setCarType(0);
        break;
      case "SUV":
        setCarType(1);
        break;
      case "hatchback":
        setCarType(2);
        break;
      default:
        setCarType(carNameToBeSearched === "" || undefined ? 3 : 4);
        break;
    }
  }, []);

  useEffect(() => {
    if (from === "all-cars") {
      setCarType(3);
    }
  }, [from]);

  useEffect(() => {
    if (searchtext == null) {
      setCarType(3);
    }
  }, [searchtext, navigate]);

  useEffect(() => {
    if (carType === 4) {
      navigate(`/cars?search-text=${carNameToBeSearched}`);
      dispatch(getCars(""));
    }
    else if (carType === 3) {
      dispatch(resetCars());
      dispatch(getCars(""));
    }
    else {
      navigate(`/cars?car-type=${carTypeList[carType]}`);
      dispatch(resetCars());
      dispatch(getCars(carTypeList[carType]));
    }
  }, [dispatch, carType, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  let fetchMoreData = () => {
    setTimeout(() => {
      if (carType == 3) dispatch(getMoreCars(""));
      else dispatch(getMoreCars(carTypeList[carType]));
    }, 2000);
  }

  return (
    <>
      <ButtonGroup className="mb-2">
        <Button
          className={`${carType === 3 ? "active-tab" : ""}`}
          onClick={() => {
            setCarType(3);
            setCarNameToBeSearched("");
          }}
        >
          View All
        </Button>
        <Button
          className={`${carType === 0 ? "active-tab" : ""}`}
          onClick={() => {
            setCarType(0);
            setCarNameToBeSearched("");
          }}
        >
          Sedan
        </Button>
        <Button
          className={`${carType === 1 ? "active-tab" : ""}`}
          onClick={() => {
            setCarType(1);
            setCarNameToBeSearched("");
          }}
        >
          SUV
        </Button>
        <Button
          className={`${carType === 2 ? "active-tab" : ""}`}
          onClick={() => {
            setCarType(2);
            setCarNameToBeSearched("");
          }}
        >
          Hatchback
        </Button>
      </ButtonGroup>
      {(carType === 4 &&
        <p className="result-count" data-testid="resultcount">
          {
            cars?.filter((car: CarDetails) =>
              car.name
                .toLowerCase()
                .includes(carNameToBeSearched?.toLowerCase())
            )?.length
          }{" "}
          total results
        </p>
      )}
      {carType !== 4 && (
        <p className="result-count" data-testid="resultcount">
          {cars?.length} total results
        </p>
      )}
      <Container className="carsContainer">
        {(cars === undefined || cars?.length === 0) && <div id="nocars">No Cars Available</div>}
        {carType === 4 &&
          cars?.filter((car: CarDetails) =>
            car.name.toLowerCase().includes(carNameToBeSearched?.toLowerCase())
          )?.length === 0 && (
            <div className="sorry-message">
              <p>Sorry, the car you have searched is not available</p>
              <img src={sademoji} alt="Sad smiley face" width={200}></img>
            </div>
          )}
        {carType === 4 &&
          cars
            ?.filter((car: CarDetails) =>
              car.name
                .toLowerCase()
                .includes(carNameToBeSearched?.toLowerCase())
            )
            ?.map((car: CarDetails) => <CarCard key={car.id} car={car} />)}
        {carType !== 4 &&
          <InfiniteScroll
            dataLength={(cars === undefined) ? 1 : cars?.length}
            next={fetchMoreData}
            hasMore={cars?.length < 101}
            loader={<Loader />}
            endMessage={<EndMessage />}
          >
            <div className="carsContainer">
              {cars?.map((car: CarDetails, index: number) => (
                <CarCard key={index} id={car?.id} car={car} />
              ))}
            </div>
          </InfiniteScroll>}
      </Container>
    </>
  );
}
export default CarsList;