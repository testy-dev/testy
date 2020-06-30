import React from 'react';

import Helmet from 'react-helmet';

import Button from '../components/Button';
import Card from '../components/Card';
import CustomerCard from '../components/CustomerCard';
// import HeroImage from '../svg/HeroImage';
import LabelText from '../components/LabelText';
import Layout from '../components/layout/Layout';
import SpeedTest from '../svg/SpeedTest';
import SplitSection from '../components/SplitSection';
import StatsBox from '../components/StatsBox';
import SvgCharts from '../svg/SvgCharts';
import UsabilityTesting from '../svg/UsabilityTesting';
import customerData from '../data/customer-data';

export default () => (
  <Layout>
    <Helmet>
      <title>Testy: all-in-1 tool for test websites</title>
    </Helmet>
    <section className="pt-20 md:pt-40">
      <div className="container mx-auto px-8 lg:flex">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-none">
            All-in-one tool for test websites
          </h1>
          <p className="text-xl lg:text-2xl mt-6 font-light">
            Record tests, run, analyse results. Without programming.
          </p>
          <p className="mt-8 md:mt-12">
            <Button size="lg" href="https://app.testy.dev">
              Get started now
            </Button>
          </p>
          {/* <p className="mt-4 text-gray-600"></p> */}
        </div>
        <div className="lg:w-1/2">
          {/* <HeroImage /> */}
          <UsabilityTesting />
        </div>
      </div>
    </section>
    <section id="features" className="py-20 lg:pb-40 lg:pt-48">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl lg:text-5xl font-semibold">Main Features</h2>
        <div className="flex flex-col sm:flex-row sm:-mx-3 mt-12">
          <div className="flex-1 px-3">
            <Card className="mb-8">
              <p className="font-semibold text-xl">Recorder</p>
              <p className="mt-4">
                Use your application to record tests.
                <br />
                Just click, type or select text in website.
              </p>
            </Card>
          </div>
          <div className="flex-1 px-3">
            <Card className="mb-8">
              <p className="font-semibold text-xl">Super fast test running</p>
              <p className="mt-4">Tests are running fully parallel and results are real-time.</p>
            </Card>
          </div>
          <div className="flex-1 px-3">
            <Card className="mb-8">
              <p className="font-semibold text-xl">Click to fix</p>
              <p className="mt-4">
                If element is not found, just click to right element to fix tests.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
    <SplitSection
      id="services"
      primarySlot={
        <div className="lg:pr-32 xl:pr-48">
          <h3 className="text-3xl font-semibold leading-tight">Recorder</h3>
          <p className="mt-8 text-xl font-light leading-relaxed">
            Use your application to record tests.
            <br />
            Just click, type or select text in website.
          </p>
        </div>
      }
      secondarySlot={<SvgCharts />}
    />
    <SplitSection
      reverseOrder
      primarySlot={
        <div className="lg:pl-32 xl:pl-48">
          <h3 className="text-3xl font-semibold leading-tight">Super fast test running</h3>
          <p className="mt-8 text-xl font-light leading-relaxed">
            Tests are running fully parallel and results are real-time.
          </p>
        </div>
      }
      secondarySlot={<SpeedTest />}
    />
    <SplitSection
      primarySlot={
        <div className="lg:pr-32 xl:pr-48">
          <h3 className="text-3xl font-semibold leading-tight">Click to fix</h3>
          <p className="mt-8 text-xl font-light leading-relaxed">
            If element is not found, just click to right element to fix tests.
          </p>
        </div>
      }
      secondarySlot={<SvgCharts />}
    />
    <section id="stats" className="py-20 lg:pt-32">
      <div className="container mx-auto text-center">
        <LabelText className="text-gray-600">Our customers get results</LabelText>
        <div className="flex flex-col sm:flex-row mt-8 lg:px-24">
          <div className="w-full sm:w-1/3">
            <StatsBox primaryText="+100%" secondaryText="Stats Information" />
          </div>
          <div className="w-full sm:w-1/3">
            <StatsBox primaryText="+100%" secondaryText="Stats Information" />
          </div>
          <div className="w-full sm:w-1/3">
            <StatsBox primaryText="+100%" secondaryText="Stats Information" />
          </div>
        </div>
      </div>
    </section>
    <section id="testimonials" className="py-20 lg:py-40">
      <div className="container mx-auto">
        <LabelText className="mb-8 text-gray-600 text-center">What customers are saying</LabelText>
        <div className="flex flex-col md:flex-row md:-mx-3">
          {customerData.map((customer) => (
            <div key={customer.customerName} className="flex-1 px-3">
              <CustomerCard customer={customer} />
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="container mx-auto my-20 py-24 bg-gray-200 rounded-lg text-center">
      <h3 className="text-5xl font-semibold">Ready to grow your business?</h3>
      <p className="mt-8 text-xl font-light">
        Quis lectus nulla at volutpat diam ut. Enim lobortis scelerisque fermentum dui faucibus in.
      </p>
      <p className="mt-8">
        <Button size="xl" href="https://app.testy.dev">
          Get Started Now
        </Button>
      </p>
    </section>
  </Layout>
);
