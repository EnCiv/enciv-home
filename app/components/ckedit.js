import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from './ckeditor'
import cx from 'classnames'

export default function CKedit(props) {
  const { className, onDone } = props
  const classes = useStylesFromThemeFunction()
  const [_this, neverSet_this] = useState({})
  return (
    <div className={cx(classes.ckedit, className)}>
      <h2>Using CKEditor&nbsp;5 build in React</h2>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor&nbsp;5!</p>"
        onReady={editor => {
          // You can store the "editor" and use when it is needed.
          this.editor = editor
          console.log('Editor is ready to use!', editor)
        }}
        onChange={event => {
          console.log(event)
        }}
        onBlur={(event, editor) => {
          onDone(editor.getData())
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor)
        }}
      />
    </div>
  )
}

const useStylesFromThemeFunction = createUseStyles(theme => ({
  ckedit: {},
}))
