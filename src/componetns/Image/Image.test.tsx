import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Image from './Image';
import axios from 'axios';
import userEvent from '@testing-library/user-event'
import Tester from '../Tester';
const BaseUrl = 'http://localhost:5000';
jest.mock('axios');


test('rendering Image component', () => {
  render(<MemoryRouter><Image /></MemoryRouter>);
  const linkElement = screen.getByTestId("image-container");
  expect(linkElement).toBeInTheDocument();
});

test('Cheking user name input', () => {
  render(<MemoryRouter><Image /></MemoryRouter>);
  const userName = screen.getByPlaceholderText("Enter your name");
  expect(userName).toBeInTheDocument();
});

test('Cheking Home btn', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><Image /></MemoryRouter>);
  const homeBtn = screen.getByTestId("home-btn") as HTMLElement;
  await user.click(homeBtn);
  render(<MemoryRouter initialEntries={['/']}>
    <Tester />
  </MemoryRouter>)
  expect(await screen.findByText(/Survey/i)).toBeInTheDocument();
});

const imageMockData = {
  data: [{
    desc: "segpo5ktp",
    imageFile: ['http://res.cloudinary.com/daguvaxyh/image/upload/v1706851289/Images/x2arlufys6umsgrnf2wp.png',
      'http://res.cloudinary.com/daguvaxyh/image/upload/v1706851289/Images/robmt9oktftaxq50rtrm.webp',
      'http://res.cloudinary.com/daguvaxyh/image/upload/v1706851289/Images/tcyjzlwnnvjrrpi1tlto.png',
      'http://res.cloudinary.com/daguvaxyh/image/upload/v1706851290/Images/twpgtmabajv7ztdheezi.png'
    ],
    stage: "published",
    title: "IMag3 natuer",
    type: "Image",
    _id: "65bc7bbc204919eb7b8d4107"
  }]
}

axios.get = jest.fn().mockResolvedValue({ data: imageMockData });

it('Testing Image data rendering', async () => {
  const imageId = "65bc7bbc204919eb7b8d4107";
  render(<MemoryRouter initialEntries={[`/image/${imageId}`]}>
    <Routes>
      <Route path='/image/:imageid' element={<Image />} />
    </Routes>
  </MemoryRouter>)

  await waitFor(async() => {
    const imageTag = screen.getAllByTestId('image-tag');
    expect(imageTag[0]).toBeInTheDocument();
    expect(screen.getByText(/Please select any two images !!/i)).toBeInTheDocument();
    expect(screen.getByText(/Please add your name/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    expect(screen.getByTestId(/images/i)).toBeInTheDocument();
  })
})

it('Submit btn test', async () => {
  const user = userEvent.setup();
  const id = '65bc7bbc204919eb7b8d4107';
  render(<MemoryRouter initialEntries={[`/image/${id}`]}>
    <Routes>
      <Route path='/image/:imageid' element={<Image />} />
    </Routes>
  </MemoryRouter>)

  await waitFor(async () => {
    const submitBtn = screen.getByTestId('image-submit');
    await user.click(submitBtn);
    expect(screen.getByText(/Please wait.../i)).toBeInTheDocument();
  })
})