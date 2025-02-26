import type { NoteKind } from "../types";
import type { Note } from "./note";

export class TimingGroup extends Array<Note> {
    attributes: string[];

    constructor(
        noteList: Note[] = [],
        attributes: string[] = []
    ) {
        if (typeof noteList === "number") {
            super(noteList);
        }
        else {
            super();
            this.push(...noteList);
        }
        this.attributes = attributes;
    }

    mirror() {
        this.forEach((note) => note.mirror());
        return this;
    }

    moveBy(t: number) {
        this.forEach((note) => note.moveBy(t));
        return this;
    }

    speedAs(rate: number) {
        this.forEach((note) => note.speedAs(rate));
        return this;
    }

    override toString(outer = false) {
        const inner = this.map((note) => {
            return note.toString();
        });

        if (outer) {
            return `timinggroup(${
                this.attributes.join("_")
            }){\n  ${
                inner.join("\n  ")
            }\n};`;
        }
        else {
            return inner.join("\n");
        }
    }

    get kind(): NoteKind {
        return "timinggroup";
    }
}