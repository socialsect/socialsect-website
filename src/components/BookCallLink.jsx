'use client'

import Link from 'next/link'
import { BOOK_A_CALL_FORM } from '../constants/routes.js'

export default function BookCallLink({ to = BOOK_A_CALL_FORM, href, ...props }) {
  return <Link href={href ?? to} {...props} />
}
