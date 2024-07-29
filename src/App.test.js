import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';  
import App from "./App";
import React from 'react';

test("The main reder is renderes", () => {
    render(<App />);
    const cepHeader = screen.getByText(/Buscador de CEP/i);

    expect(cepHeader).toBeInTheDocument();
});

test("Verify if the input is being correctly formated", () => {
    render(<App />);
    const cepInput = screen.getByPlaceholderText(/Digite o CEP/i);
    
    fireEvent.change(cepInput, { target: { value: '53130410'}});
    expect(cepInput.value).toBe('53130-410');
});

test("Verify search button is enabled by default", () => {
    render(<App />);
    const searchButton = screen.getByRole("button");

    expect(searchButton).toBeDisabled();
});

test("Verify te search button gets disabled when typing all the cep numbers", () => {
    render(<App />)

    const searchButton = screen.getByRole("button");
    const cepInput = screen.getByPlaceholderText(/Digite o CEP/i);

    fireEvent.change(cepInput, { target: { value: '53130410' } });
    
    expect(searchButton).toBeEnabled();
});
