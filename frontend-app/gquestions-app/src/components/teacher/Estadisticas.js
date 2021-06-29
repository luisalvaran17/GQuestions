import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import '../../assets/styles/tailwind.css';
import { Helmet } from 'react-helmet';
import { DropdownUser } from '../teacher/user/DropdownUser';
import AOS from "aos";
import Scrollbars from "react-custom-scrollbars";
import backgroundGeneralYellowDark from "../../assets/images/background-general-yellow_dark.png";
import backgroundGeneralYellowLight from "../../assets/images/background-general-yellow_light.png";
import ApexCharts from 'apexcharts';
import { GetCountsGeneraciones } from '../../api/Estadisticas/GetCountsGeneraciones';
import { LoadingPage } from '../../containers/LoadingPage';

export const Estadisticas = () => {

  // Hooks dark mode
  const darkModeRef = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

  const [isLoading, setIsLoading] = useState(true);

  // Hooks count
  const [countGeneraciones, setCountGeneraciones] = useState({
    "generaciones_count": 0,
    "examenes_count": 0,
    "textos_count": 0,
    "preguntas_count": 0,
  })

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      setDarkModeBool(true);
      darkModeRef.current.classList.add('dark')
    } else {
      setDarkModeBool(false);
      darkModeRef.current.classList.remove('dark')
    }
    AOS.init({
      duration: 800,
    })
    setIsLoading(false);
    getAllCountsGeneraciones();// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const getAllCountsGeneraciones = async () => {
    const id_user = localStorage.getItem('id_user');

    setIsLoading(true)
    const counts = await GetCountsGeneraciones(id_user);
    const generaciones = counts.generaciones

    let total_examenes = 0;
    let total_textos = 0;
    let total_preguntas = 0;
    let arrayColumnsChart = [];
    let date = new Date();
    let dates = [];

    if (generaciones === undefined) {
      console.log("error")
    } else {
      generaciones.map(generacion => {
        if (generacion.generacion_examenes.length !== 0) {
          total_examenes = generacion.generacion_examenes[0].examenes.length;
        } else {
          /* total_examenes = 0; */
        }
        total_textos += generacion.generaciones_texto.length;
        total_preguntas += generacion.n_preguntas * generacion.generaciones_texto.length;
        date = new Date(generacion.fecha_generacion)
        dates.push(date.getMonth())
        return true;
      })

      arrayColumnsChart.push(counts.generaciones_count);
      arrayColumnsChart.push(total_examenes);
      arrayColumnsChart.push(total_textos);
      arrayColumnsChart.push(total_preguntas);

      setCountGeneraciones(
        Object.assign({
          "generaciones_count": counts.generaciones_count,
          "examenes_count": total_examenes,
          "textos_count": total_textos,
          "preguntas_count": total_preguntas,
        })
      )

      setIsLoading(false)
      columnChart(arrayColumnsChart);
      splineArea(contadorMesesGeneraciones(dates));
    }
  }

  const contadorMesesGeneraciones = (months) => {
    let contadorMeses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let index = 0; index < months.length; index++) {

      let month = months[index]

      if (month === 0) {
        contadorMeses[month] = contadorMeses[month] + 1
      }
      if (month === 1) {
        contadorMeses[month] = contadorMeses[month] + 1
      }
      if (month === 2) {
        contadorMeses[month] = contadorMeses[month] + 1
      }
      if (month === 3) {
        contadorMeses[month] = contadorMeses[month] + 1
      }
      if (month === 4) {
        contadorMeses[month] = contadorMeses[month] + 1
      }
      if (month === 5) {
        contadorMeses[month] = contadorMeses[month] + 1
      }
      if (month === 6) {
        contadorMeses[month] = contadorMeses[month] + 1
      }
      if (month === 7) {
        contadorMeses[month] = contadorMeses[month] + 1
      }
      if (month === 8) {
        contadorMeses[month] = contadorMeses[month] + 1
      }
      if (month === 9) {
        contadorMeses[month] = contadorMeses[month] + 1
      }
      if (month === 10) {
        contadorMeses[month] = contadorMeses[month] + 1
      }
      if (month === 11) {
        contadorMeses[month] = contadorMeses[month] + 1
      }
    }
    return contadorMeses;
  }

  const splineArea = (months) => {
    var options = {
      series: [{
        name: 'Generaciones',
        data: months,
      }],
      chart: {
        foreColor: "#939393",
        height: 400,
        type: 'area'
      },
      markers: {
        colors: ['#F44336', '#E91E63', '#9C27B0']
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'months',
        categories: ["Ene", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"],
        style: {
          colors: ['#F44336', '#E91E63', '#9C27B0']
        }
      },
      tooltip: {
        x: {
          format: 'MM'
        },
      },
    };

    var chart = new ApexCharts(document.querySelector("#splineArea"), options);

    if (isLoading) chart.render();
  }

  const columnChart = (array_columns_chart) => {

    var options = {
      series: [{
        name: '',
        data: array_columns_chart,
      }],
      chart: {
        foreColor: "#939393",
        height: 350,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [
          'Generaciones',
          'Examenes',
          'Textos',
          'Preguntas',
        ],
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      }
    };

    var chart = new ApexCharts(document.querySelector("#chartpie"), options);
    if (isLoading) chart.render();
  }

  return (
    <div
      ref={darkModeRef}
      className="flex container w-screen font-manrope"
      style={{
        backgroundImage: `url(${darkModeBool ? backgroundGeneralYellowDark : backgroundGeneralYellowLight})`,
        width: "100%",
        height: "",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "",
        minWidth: "100%",
      }}>
      <Helmet>
        <title>Estadísticas - GQuestions</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"></link>
      </Helmet>

      <Navbar className="fixed" />

      <CustomScrollbars
        autoHide
        autoHideTimeout={900}
        autoHideDuration={400}
        data-aos="fade-right"
        style={{ height: "100vh" }}
        className='lg:text-base text-sm dark:text-white'>

        <div className="container grid grid-rows xl:px-32 px-4 py-8 md:px-8 lg:px-16">
          <h1 className='mx-2 font-black xl:text-5xl md:text-4xl text-2xl md:text-left md:mb-10 '>
            Estadísticas
          </h1>
          <p className="mx-2 text-gray-500 font-semibold text-sm md:text-base dark:text-gray-200 sm:mb-10 mb-0">
            Aquí puedes visualizar información de tus generaciones.
          </p>

          {!isLoading &&
            <div className="w-full grid mb-4 pb-10 pr-6 dark:border-transparent sm:px-8 rounded-3xl sm:bg-gray-50 bg-transparent border-gray- dark:bg-darkColor sm:border sm:dark:border-gray-800 sm:shadow">

              <div className="grid grid-cols-12 gap-6">
                <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                  <div className="col-span-12 mt-8">
                    <div className="grid grid-cols-12 gap-6 mt-5">
                      <span className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 
                    sm:col-span-6 xl:col-span-3 intro-y bg-white dark:bg-darkGrayColor2 border  border-transparent dark:border-gray-700"
                      >
                        <div className="p-5">
                          <div className="flex justify-between">
                            <span
                              className="text-blue-500 material-icons mr-2"
                            >&#xf1c6;
                          </span>
                            <div
                              className="bg-blue-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                              <span className="flex items-center">Total</span>
                            </div>
                          </div>
                          <div className="w-full flex-1">
                            <div>
                              <div className="mt-3 text-3xl font-bold leading-8">{countGeneraciones.generaciones_count}</div>

                              <div className="mt-1 text-base text-gray-600 dark:text-gray-200">Generaciones</div>
                            </div>
                          </div>
                        </div>
                      </span>
                      <span className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 
                    sm:col-span-6 xl:col-span-3 intro-y bg-white dark:bg-darkGrayColor2 border  border-transparent dark:border-gray-700"
                        href="#">
                        <div className="p-5">
                          <div className="flex justify-between">
                            <span
                              className="text-green-500 material-icons mr-2"
                            >&#xf04c;
                          </span>
                            <div
                              className="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                              <span className="flex items-center">Total</span>
                            </div>
                          </div>
                          <div className="w-full flex-1">
                            <div>
                              <div className="mt-3 text-3xl font-bold leading-8">{countGeneraciones.examenes_count}</div>

                              <div className="mt-1 text-base text-gray-600 dark:text-gray-200">Exámenes</div>
                            </div>
                          </div>
                        </div>
                      </span>
                      <span className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 
                    sm:col-span-6 xl:col-span-3 intro-y bg-white dark:bg-darkGrayColor2 border  border-transparent dark:border-gray-700"
                        href="#">
                        <div className="p-5">
                          <div className="flex justify-between">
                            <span
                              className="text-yellow-500 material-icons mr-2"
                            >&#xe8d2;
                          </span>
                            <div
                              className="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                              <span className="flex items-center">Total</span>
                            </div>
                          </div>
                          <div className="w-full flex-1">
                            <div>
                              <div className="mt-3 text-3xl font-bold leading-8">{countGeneraciones.textos_count}</div>

                              <div className="mt-1 text-base text-gray-600 dark:text-gray-200">Textos</div>
                            </div>
                          </div>
                        </div>
                      </span>
                      <span className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 
                    sm:col-span-6 xl:col-span-3 intro-y bg-white dark:bg-darkGrayColor2 border  border-transparent dark:border-gray-700"
                        href="#">
                        <div className="p-5">
                          <div className="flex justify-between">
                            <span
                              className="text-pink-600 material-icons mr-2"
                            >&#xe0c6;
                          </span>
                            <div
                              className="bg-pink-600 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                              <span className="flex items-center">Total</span>
                            </div>
                          </div>
                          <div className="w-full flex-1">
                            <div>
                              <div className="mt-3 text-3xl font-bold leading-8">{countGeneraciones.preguntas_count}</div>

                              <div className="mt-1 text-base text-gray-600 dark:text-gray-200">Preguntas</div>
                            </div>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="col-span-12 mt-5">
                    <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
                      <div className="bg-white text-black dark:bg-darkGrayColor2 border border-transparent dark:border-gray-700 shadow-lg p-4" id="chartpie"></div>
                      <div className="bg-white text-black dark:bg-darkGrayColor2 border border-transparent dark:border-gray-700 shadow-lg p-4" id="splineArea"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }{isLoading &&
            <div className="pt-52">
              <LoadingPage />
            </div>
          }
        </div>
      </CustomScrollbars>
      <DropdownUser />
    </div>
  );
}

// Funciones que cambian el estilo del scroll y otras props de una librería
const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: 'rgba(35, 49, 86, 0.8)'
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const CustomScrollbars = props => (
  <Scrollbars
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
);