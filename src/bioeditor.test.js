import React from "react";
import Profile from "./profile";
import BioEditor from "./bioeditor";
import { render, fireEvent } from "@testing-library/react";

test('Clicking either the "Add" or "Edit" button causes a textarea and a "Save" button to be rendered', () => {
    const { container } = render(
        <div>
            <button />
        </div>
    );

    expect(container.querySelector("div").innerHTML).toContain(
        <button>Add your bio</button> || <button>Edit your bio</button>
    );

    fireEvent.click(container.querySelector("button"));

    expect(container.querySelector("div").innerHTML).toContain(
        <textarea /> && <button>Save</button>
    );
});
