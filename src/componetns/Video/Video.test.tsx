import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import Video from './Video';
import axios from 'axios';
import Tester from '../Tester';
const BaseUrl = 'http://localhost:5000'
jest.mock('axios');

test('Cheking Video Component', () => {
  render(<MemoryRouter><Video /></MemoryRouter>);
  const linkElement = screen.getByText("Please cut the important part of video !!");
  expect(linkElement).toBeInTheDocument();
});

test('Cheking Home btn', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><Video /></MemoryRouter>);
  const homeBtn = screen.getByTestId("home-btn") as HTMLElement;
  await user.click(homeBtn);
  render(<MemoryRouter initialEntries={['/']}>
    <Tester />
  </MemoryRouter>)
  expect(await screen.findByText(/Survey/i)).toBeInTheDocument();
});

test('Cheking user name input', () => {
  render(<MemoryRouter><Video /></MemoryRouter>);
  const userName = screen.getByPlaceholderText("Enter your name");
  expect(userName).toBeInTheDocument();
});

const mockData = {
  data: [{
    desc: "Ne video",
    stage: "published",
    title: "Nature Lover",
    type: "Video",
    videoType: "mp4",
    videoUrl: "http://res.cloudinary.com/daguvaxyh/video/upload/v1706851244/Videos/ke9gqizgh01vfv7ymqyj.mp4",
    _id: "65bc7b8f204919eb7b8d4105"
  }]
}

axios.get = jest.fn().mockResolvedValue({ data: mockData });


test('Video tasting', async () => {
  const videoId = "65bc7b8f204919eb7b8d4105";
  render(<MemoryRouter initialEntries={[`/video/${videoId}`]}>
    <Routes>
      <Route path='/video/:videoid' element={<Video />} />
    </Routes>
  </MemoryRouter>)

  await waitFor(async() => {
    expect(screen.getByText(/Please add your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start time in second:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End time in second:/i)).toBeInTheDocument();
    const testId = screen.getByTestId("video-tag");
    expect(testId).toBeInTheDocument();
    expect(screen.getByTestId("videos")).toBeInTheDocument();
  })
})

it('Submit btn test', async () => {
  const user = userEvent.setup();
  const id = '65bc7b8f204919eb7b8d4105';
  render(<MemoryRouter initialEntries={[`/video/${id}`]}>
    <Routes>
      <Route path='/video/:videoid' element={<Video />} />
    </Routes>
  </MemoryRouter>)

  await waitFor(async () => {
    const submitBtn = screen.getByTestId('video-submit');
    await user.click(submitBtn);
    expect(screen.getByText(/Please wait.../i)).toBeInTheDocument();
  })
})