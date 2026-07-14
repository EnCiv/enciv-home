'use strict'

/**
 * Pre-migration baseline test for send-contact-us socket API (T2 in docs/update2026.md).
 *
 * Tests all branches of sendContactUs without any network or SMTP calls.
 */

// Mock nodemailerstart before any import resolves it
jest.mock('nodemailerstart', () => jest.fn())

// Mock public.json so tests are not coupled to the real config file
jest.mock('../../../public.json', () => ({
  sendEmailFrom: 'no-reply@test.enciv.org',
  sendFeedbackTo: 'feedback@test.enciv.org',
}))

import sendContactUs from '../send-contact-us'
import sendEmail from 'nodemailerstart'

beforeEach(() => {
  global.logger = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  }
  jest.clearAllMocks()
  delete process.env.NODEMAILER_SERVICE
})

describe('sendContactUs', () => {
  const baseArgs = ['user@example.com', 'Jane', 'Doe', 'Hello', 'Test message']

  test('calls logger.info with the request object', done => {
    sendContactUs(...baseArgs, () => {
      expect(global.logger.info).toHaveBeenCalledWith(
        'sendContactUs',
        expect.objectContaining({
          from: 'no-reply@test.enciv.org',
          to: 'feedback@test.enciv.org',
          subject: 'Hello',
          text: 'Test message',
          replyTo: 'Jane Doe <user@example.com>',
        })
      )
      done()
    })
  })

  test('sets replyTo when email is provided', done => {
    sendContactUs('a@b.com', 'First', 'Last', 'Subject', 'Body', () => {
      expect(global.logger.info).toHaveBeenCalledWith(
        'sendContactUs',
        expect.objectContaining({ replyTo: 'First Last <a@b.com>' })
      )
      done()
    })
  })

  test('does not set replyTo when email is falsy', done => {
    sendContactUs('', 'First', 'Last', 'Subject', 'Body', () => {
      const call = global.logger.info.mock.calls[0][1]
      expect(call).not.toHaveProperty('replyTo')
      done()
    })
  })

  test('calls cb() with no args when NODEMAILER_SERVICE is not set', done => {
    sendContactUs(...baseArgs, result => {
      expect(result).toBeUndefined()
      expect(sendEmail).not.toHaveBeenCalled()
      done()
    })
  })

  test('calls sendEmail and resolves cb when NODEMAILER_SERVICE is set', done => {
    process.env.NODEMAILER_SERVICE = 'gmail'
    sendEmail.mockResolvedValue({ messageId: 'abc' })

    sendContactUs(...baseArgs, result => {
      expect(sendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'no-reply@test.enciv.org',
          subject: 'Hello',
        })
      )
      expect(result).toEqual({ messageId: 'abc' })
      done()
    })
  })

  test('calls cb({ error }) when sendEmail rejects', done => {
    process.env.NODEMAILER_SERVICE = 'gmail'
    sendEmail.mockRejectedValue(new Error('SMTP failure'))

    sendContactUs(...baseArgs, result => {
      expect(result).toEqual({ error: 'SMTP failure' })
      done()
    })
  })
})
