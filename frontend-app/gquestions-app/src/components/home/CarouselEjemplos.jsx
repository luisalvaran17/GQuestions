import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import rowPrev from '../../assets/images/arrow-circle-up-solid.svg';
import rowNext from '../../assets/images/arrow-circle-down-solid.svg';


class CarouselEjemplo extends Component
{
  render() {
    return (
      <Carousel
        className='bg-cyanlight'
        showThumbs={false}
        axis='vertical'
        autoPlay={false}
        verticalSwipe='natural'
        showIndicators={false}
        swipeable={false}
        renderArrowPrev={(onClickHandler, hasNext, label) => (
          <div
            type='button'
            className='shadow-md text-sm text-black text-center bg-cyanlight px-2 py-2 font-semibold lg:mb-0'
            onClick={onClickHandler}
          >
            <button onClick={this.test} className='focus:outline-none animate-bounce animation-cards-examples-small'>
              <img src={rowPrev} className='opacity-50 h-8 my-1' alt='prev' />
            </button>
          </div>
        )}
        renderArrowNext={(onClickHandler, hasPrev, label) => (
          <div
            type='button'
            className='shadow-md text-sm text-black text-center bg-cyanlight px-2 py-2 font-semibold lg:mb-0'
            onClick={onClickHandler}
          >
            <button className='focus:outline-none animate-bounce animation-cards-examples-small'>
              <img src={rowNext} className='opacity-50 h-8 my-1' alt='next' />
            </button>
          </div>
        )}
      >
        <div>
          <div
            className='mx-auto bg-local my-auto w-full py6 xl:py-10 bg-cyanlight'
            style={{
              width: '100%',
              height: '',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              minHeight: '',
              minWidth: '',
            }}
          >
            <div className='container mx-auto flex place-content-center'>
              <div className='hidden md:block md:text-sm'>
                <div className='h-2'>
                  <h1 className='font-black xl:text-6xl md:text-4xl text-xl text-justify md:text-left '>
                    Ejemplos
                  </h1>
                  <span>
                    <h1 className='font-semibold text-justify md:text-left text-gray-500 mt-4'>
                      Generación de texto
                    </h1>
                  </span>
                </div>

                <div className='grid grid-rows'>
                  <div className='grid grid-cols-12 xl:gap-x-16 items-center'>
                    <div className='col-span-6'>
                      <div className='h-32'></div>
                      <div className='animation-cards-examples p-6 max-w-sm mr-8 mx-auto text-justify bg-white rounded-xl shadow-xl flex space-x-4'>
                        <div>
                          <p className='text-gray-500'>
                            "Computer science is the study of algorithmic
                            processes, vernacular verbs. From ancient Roman
                            Rome, classical mathematics was the study of the
                            laws of physics, applied to all fields of human
                            psychology and human behavior, since it is the
                            research of those sciences to study the natural
                            world."
                          </p>
                          <div className='text-xl font-medium text-black'>
                            GTP2
                          </div>
                          <div className='text-gray-400 text-sm'>Algorithm</div>
                        </div>
                      </div>
                    </div>

                    <div className='col-span-6'>
                      <div className='grid grid-rows-2 gap-y-14'>
                        <div className='animation-cards-examples p-6 max-w-sm mx-auto text-justify bg-white rounded-xl shadow-xl flex space-x-4'>
                          <div>
                            <p className='text-gray-500'>
                              "A computer program is a program that runs on or
                              has been used by more than one person. It is a
                              computer program which is used on a computer for
                              the purpose " to compile data on another computer,
                              to obtain new data or to alter existing data. For
                              example, you have a Computer running Java, which
                              runs a program called " Java Studio ." A Computer
                              is a computer program which contains its own
                              instructions, such as executing Java code, and
                              which interprets that instruction."
                            </p>
                            <div className='text-xl font-medium text-black'>
                              GTP2
                            </div>
                            <div className='text-gray-400 text-sm'>
                              Algorithm
                            </div>
                          </div>
                        </div>
                        <div className='animation-cards-examples p-6 max-w-sm mx-auto text-justify bg-white rounded-xl shadow-xl flex space-x-4'>
                          <div>
                            <p className='text-gray-500'>
                              "Google LLC is an American multinational
                              technology company that specializes in
                              Internet-related services and products, which
                              include online advertising technologies, a search
                              engine, cloud computing, software, and hardware.
                              It is considered one of the Big Five technology
                              companies in the U.S. information technology
                              industry, alongside Amazon, Facebook, Apple, and
                              Microsoft."
                            </p>
                            <div className='text-xl font-medium text-black'>
                              GTP2
                            </div>
                            <div className='text-gray-400 text-sm'>
                              Algorithm
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='md:hidden block grid-rows text-sm space-y-4 mx-8'>
                <h1 className='font-black xl:text-6xl md:text-4xl text-3xl text-justify md:text-left '>
                  Ejemplos
                </h1>
                <div className='animation-cards-examples-small p-6 max-w-sm mx-auto text-justify bg-white rounded-xl shadow-xl flex space-x-4'>
                  <div>
                    <p className='text-gray-500'>
                      "Computer science is the study of algorithmic processes,
                      vernacular verbs. From ancient Roman Rome, classical
                      mathematics was the study of the laws of physics, applied
                      to all fields of human psychology and human behavior,
                      since it is the research of those sciences to study the
                      natural world."
                    </p>
                    <div className='text-xl font-medium text-black'>GTP2</div>
                    <div className='text-gray-400 text-sm'>Algorithm</div>
                  </div>
                </div>
                <div className='animation-cards-examples-small p-6 max-w-sm mx-auto text-justify bg-white rounded-xl shadow-xl flex space-x-4'>
                  <div>
                    <p className='text-gray-500'>
                      "A computer program is a program that runs on or has been
                      used by more than one person. It is a computer program
                      which is used on a computer for the purpose " to compile
                      data on another computer, to obtain new data or to alter
                      existing data. For example, you have a Computer running
                      Java, which runs a program called " Java Studio ." A
                      Computer is a computer program which contains its own
                      instructions, such as executing Java code, and which
                      interprets that instruction."
                    </p>
                    <div className='text-xl font-medium text-black'>GTP2</div>
                    <div className='text-gray-400 text-sm'>Algorithm</div>
                  </div>
                </div>
                <div className='animation-cards-examples-small p-6 max-w-sm mx-auto text-justify bg-white rounded-xl shadow-xl flex space-x-4'>
                  <div>
                    <p className='text-gray-500'>
                      "Google LLC is an American multinational technology
                      company that specializes in Internet-related services and
                      products, which include online advertising technologies, a
                      search engine, cloud computing, software, and hardware. It
                      is considered one of the Big Five technology companies in
                      the U.S. information technology industry, alongside
                      Amazon, Facebook, Apple, and Microsoft."
                    </p>
                    <div className='text-xl font-medium text-black'>GTP2</div>
                    <div className='text-gray-400 text-sm'>Algorithm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ejemplos generación de preguntas */}
        <div>
          <div
            className='mx-auto bg-local my-auto w-full py-16 xl:py-20 bg-cyanlight'
            style={{
              width: '100%',
              height: '',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              minHeight: '',
              minWidth: '',
            }}
          >
            <div className='container mx-auto flex place-content-center'>
              <div className='hidden md:block md:text-sm'>
                <div className='h-2'>
                  <h1 className='font-black xl:text-6xl md:text-4xl text-xl text-justify md:text-left'>
                    Ejemplos
                  </h1>
                  <span>
                    <h1 className='font-semibold text-justify md:text-left mt-4'>
                      Generación de preguntas
                    </h1>
                  </span>
                </div>

                <div className='grid grid-rows'>
                  <div className='grid grid-cols-12 md:space-x-8 xl:gap-x-16 items-center'>
                    <div className='col-span-6'>
                      <div className='h-32'></div>
                      <div className='animation-cards-examples p-6 w-full mr-8 mx-auto text-justify bg-white rounded-xl shadow-xl flex space-x-4'>
                        <div>
                          <p className=''>Q: What is Google?</p>
                          <hr></hr>
                          <p>
                            A: Google LLC is an American multinational
                            technology company that specializes in
                            Internet-related services and products, which
                            include online advertising technologies, a search
                            engine, cloud computing, software, and hardware.
                          </p>
                          <div className='text-xl font-medium text-black'>
                            Question Generator
                          </div>
                          <div className='text-gray-400 text-sm'>Algorithm</div>
                        </div>
                      </div>
                    </div>

                    <div className='col-span-6'>
                      <div className='grid grid-rows gap-y-12'>
                        <div className='animation-cards-examples h-auto p-6 w-full mr-8 mx-auto text-justify bg-white rounded-xl shadow-xl flex space-x-4'>
                          <div>
                            <p className=''>
                              Q: How many months ago did Google announce plans
                              to reorganize its various interests?
                            </p>
                            <hr></hr>
                            <p>1. September 1998</p>
                            <p className='font-bold'>
                              2. August 2015 (correct)
                            </p>
                            <p>3. August 19, 2004</p>
                            <p>4. September 4, 1998</p>

                            <div className='text-xl font-medium text-black'>
                              Question Generator
                            </div>
                            <div className='text-gray-400 text-sm'>
                              Algorithm
                            </div>
                          </div>
                        </div>

                        <div className='animation-cards-examples p-6 max-w-sm mx-auto text-justify bg-white rounded-xl shadow-xl flex space-x-4'>
                          <div>
                            <p className=''>
                              Q: What state did Google incorporate as a
                              privately held company?
                            </p>
                            <hr></hr>
                            <p>1. 56 percent</p>
                            <p className='font-bold'>2. California (correct)</p>
                            <p>3. Delaware</p>
                            <p>4. Mountain View</p>

                            <div className='text-xl font-medium text-black'>
                              Question Generator
                            </div>
                            <div className='text-gray-400 text-sm'>
                              Algorithm
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='md:hidden block grid-rows text-sm space-y-10 mx-8'>
                <h1 className='font-black xl:text-6xl md:text-4xl text-3xl text-justify md:text-left '>
                  Ejemplos
                </h1>
                <div className='animation-cards-examples-small p-6 max-w-sm mx-auto text-justify bg-white rounded-xl shadow-xl flex space-x-4'>
                  <div>
                    <p className=''>Q: What is Google?</p>
                    <hr></hr>
                    <p>
                      A: Google LLC is an American multinational technology
                      company that specializes in Internet-related services and
                      products, which include online advertising technologies, a
                      search engine, cloud computing, software, and hardware.
                    </p>
                    <div className='text-xl font-medium text-black'>
                      Question Generator
                    </div>
                    <div className='text-gray-400 text-sm'>Algorithm</div>
                  </div>
                </div>
                <div className='animation-cards-examples-small p-6 max-w-sm mx-auto text-justify bg-white rounded-xl shadow-xl flex space-x-4'>
                  <div>
                    <p className=''>
                      Q: How many months ago did Google announce plans to
                      reorganize its various interests?
                    </p>
                    <hr></hr>
                    <p>1. September 1998</p>
                    <p className='font-bold'>2. August 2015 (correct)</p>
                    <p>3. August 19, 2004</p>
                    <p>4. September 4, 1998</p>

                    <div className='text-xl font-medium text-black'>
                      Question Generator
                    </div>
                    <div className='text-gray-400 text-sm'>Algorithm</div>
                  </div>
                </div>
                <div className='animation-cards-examples-small p-6 max-w-sm mx-auto text-justify bg-white rounded-xl shadow-xl flex space-x-4'>
                  <div>
                    <p className=''>
                      Q: What state did Google incorporate as a privately held
                      company?
                    </p>
                    <hr></hr>
                    <p className=''>1. 56 percent</p>
                    <p className=' font-bold'>2. California (correct)</p>
                    <p className=''>3. Delaware</p>
                    <p className=''>4. Mountain View</p>

                    <div className='text-xl font-medium text-black'>
                      Question Generator
                    </div>
                    <div className='text-gray-400 text-sm'>Algorithm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    );
  }
}
export default CarouselEjemplo;
