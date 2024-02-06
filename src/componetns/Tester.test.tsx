import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Tester from './Tester';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import Video from './Video/Video';
import Image from './Image/Image';
import Form from './Form/Form';
const BaseUrl = 'http://localhost:5000';
jest.mock('axios');

test('Checking Tester component', () => {
  render(<MemoryRouter><Tester /></MemoryRouter>);
  const linkElement = screen.getByText("Survey");
  expect(linkElement).toBeInTheDocument();
});

describe('Video container testing', () => {
  const videoData = {
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

  axios.get = jest.fn().mockResolvedValue({ data: videoData });


  it('Video onclick navigation', async () => {

    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={['/']}>
      <Tester />
    </MemoryRouter>)

    await waitFor(async () => {
      const id = '65bc7b8f204919eb7b8d4105';
      const videoId = screen.getByTestId(/survey-block-video-0/i) as unknown as HTMLElement;
      await user.click(videoId);
      render(<MemoryRouter initialEntries={[`/video/${id}`]}>
        <Routes>
          <Route path='/video/:videoid' element={<Video />} />
        </Routes>
      </MemoryRouter>)
      expect(await screen.findByText(/Please cut the important part of video !!/i)).toBeInTheDocument();
    })
  })
})

describe('Image container testing', () => {
  const imageData = {
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

  axios.get = jest.fn().mockResolvedValue({ data: imageData });

  it('Image onclick navigation', async () => {

    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={['/']}>
      <Tester />
    </MemoryRouter>)

    await waitFor(async () => {
      const id = '65bc7bbc204919eb7b8d4107';
      const Id = screen.getByTestId(/survey-block-image-0/i) as unknown as HTMLElement;
      await user.click(Id);
      render(<MemoryRouter initialEntries={[`/image/${id}`]}>
        <Routes>
          <Route path='/image/:imageid' element={<Image/>} />
        </Routes>
      </MemoryRouter>)
      expect(await screen.findByText(/Please select any two images !!/i)).toBeInTheDocument();
    })
  })
})

describe('Form container testing', () => {
  const formData = {
    data: [{
      _id: '65bc7b61204919eb7b8d4103',
      type: "Survey",
      title: "Malum hamko tumhe",
      desc: "Kis bat ka intte jar hai",
      questions: [
        {
          type: "",
          question: "",
          options: []
        },
        {
          type: "single",
          question: "Ka ho na pyarr hai",
          options: []
        },
        {
          type: "radio",
          question: "Kaha na ptya hai",
          options: ["gertg", "xrdget"]
        },
        {
          type: "checkbox",
          question: "sddfetgf",
          options: ["dgdt", "sgrthr"]
        },
        {
          type: "single",
          question: "sdfgt",
          options: []
        }
      ],
      stage: "published",
      status: "Answered"
    }]
  }

  axios.get = jest.fn().mockResolvedValue({ data: formData });

  it('testing form title and description', async () => {
    render(<MemoryRouter initialEntries={['/']}>
      <Tester />
    </MemoryRouter>)

    await waitFor(() => {
      const type = screen.getAllByText(/Survey/i);
      const Title = screen.getAllByText(/Malum hamko tumhe/i);
      const Desc = screen.getAllByText(/Kis bat ka intte jar hai/i);
      expect(Title[0]).toBeInTheDocument();
      expect(Desc[0]).toBeInTheDocument();
      expect(type[0]).toBeInTheDocument();
    })
  })

  it('form onclick navigation', async () => {

    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={['/']}>
      <Tester />
    </MemoryRouter>)

    await waitFor(async () => {
      const id = '65bc7bbc204919eb7b8d4107';
      const Id = screen.getByTestId(/survey-block-form-0/i) as unknown as HTMLElement;
      await user.click(Id);
      render(<MemoryRouter initialEntries={[`/form/${id}`]}>
        <Routes>
          <Route path='/form/:formid' element={<Form/>} />
        </Routes>
      </MemoryRouter>)
      expect(await screen.findByText(/Please fill the form !!/i)).toBeInTheDocument();
    })
  })
})