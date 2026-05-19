import { Link } from 'react-router-dom'
import { BOOK_A_CALL_FORM } from '../constants/routes.js'

/**
 * Primary booking CTA  always lands on the book-a-call form, not an intermediate section.
 */
export default function BookCallLink({ to = BOOK_A_CALL_FORM, ...props }) {
  return <Link to={to} {...props} />
}
