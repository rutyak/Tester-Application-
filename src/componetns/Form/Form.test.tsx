import React from 'react';
import { logRoles, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useParams, Route, Routes } from 'react-router-dom';
import Form from './Form';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import Tester from '../Tester';
jest.mock('axios');
const BaseUrl = 'http://localhost:5000';



it('checking rendering', () => {
  render(<MemoryRouter><Form /></MemoryRouter>);
  expect(screen.getByTestId("form-container")).toBeInTheDocument();
  expect(screen.getByText("Please fill the form !!")).toBeInTheDocument();
})

it('input name testing', async() => {
  userEvent.setup();
  render(<MemoryRouter><Form/></MemoryRouter>);
  const input = screen.getByPlaceholderText('Enter your name');
  await userEvent.type(input, 'Rutik');
  expect(screen.getByPlaceholderText('Enter your name')).toHaveValue('Rutik')
})

test('Cheking Home btn', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><Form /></MemoryRouter>);
  const homeBtn = screen.getByTestId("home-btn") as HTMLElement;
  await user.click(homeBtn);
  render(<MemoryRouter initialEntries={['/']}>
    <Tester />
  </MemoryRouter>)
  expect(await screen.findByText(/Survey/i)).toBeInTheDocument();
});


const mockData = {
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
};

axios.get = jest.fn().mockResolvedValue({ data: mockData });

test('testing entire component', async () => {
  const id = '65bc7b61204919eb7b8d4103';
  render(
    <MemoryRouter initialEntries={[`/form/${id}`]}>
      <Routes>
        <Route path="/form/:formid" element={<Form />} />
      </Routes>
    </MemoryRouter>
  );


  await waitFor(async() => {
    expect(screen.getByText(/Kaha na ptya hai/i)).toBeInTheDocument();
    const placeholder = screen.getAllByPlaceholderText(/Add your answer/i);
    expect(placeholder[0]).toBeInTheDocument();
    expect(screen.getByText(/sddfetgf/i)).toBeInTheDocument();
    expect(screen.getByText(/dgdt/i)).toBeInTheDocument();
    expect(screen.getByText(/sgrthr/i)).toBeInTheDocument();
    expect(screen.getByText(/gertg/i)).toBeInTheDocument();
    expect(screen.getByText(/xrdget/i)).toBeInTheDocument();
    expect(screen.getByText(/Please fill the form !!/i)).toBeInTheDocument();
    expect(screen.getByText(/Please add your name/i)).toBeInTheDocument();
    expect(screen.getByText(/SUBMIT/i)).toBeInTheDocument();
  });

  const testId = screen.queryByTestId("image-video-container");
  expect(testId).toBeInTheDocument();
});

it('Submit btn test', async () => {
  const user = userEvent.setup();
  const id = '65bc7b61204919eb7b8d4103';
  render(<MemoryRouter initialEntries={[`/form/${id}`]}>
    <Routes>
      <Route path='/form/:formid' element={<Form />} />
    </Routes>
  </MemoryRouter>)

  await waitFor(async () => {
    const submitBtn = screen.getByTestId('form-submit');
    await user.click(submitBtn);
    expect(screen.getByText(/Please wait.../i)).toBeInTheDocument();
  })
})

it('Input answer onchange test', async () => {
  const user = userEvent.setup();
  const id = '65bc7b61204919eb7b8d4103';
  render(<MemoryRouter initialEntries={[`/form/${id}`]}>
    <Routes>
      <Route path='/form/:formid' element={<Form/>} />
    </Routes>
  </MemoryRouter>)

  await waitFor(async () => {
    const input = screen.getAllByPlaceholderText(/Add your answer/i);
    await user.type(input[0],'Yes');
    expect(input[0]).toBeInTheDocument();
  })
})
