import { $ } from "../utils";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const test = {
  async render() {
    return /*html*/ `
    <form id="form-update" method="post">
        <textarea name="content" id="editor">
            &lt;p&gt;This is some sample content.&lt;/p&gt;
        </textarea>
        <p><input type="submit" value="Submit"></p>
    </form>
      `;
  },
  async afterRender() {
    var myEditor;

    ClassicEditor.create(document.querySelector("#editor"))
      .then((editor) => {
        console.log("Editor was initialized", editor);
        myEditor = editor;
      })
      .catch((err) => {
        console.error(err.stack);
      });

    $("#form-update").addEventListener("submit", async function (e) {
      e.preventDefault();
      console.log(myEditor.getData());
    });
  },
};

export default test;
