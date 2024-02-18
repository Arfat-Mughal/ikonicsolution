<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public $url;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(string $url)
    {
        $this->url = $url;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $subject = 'Reset Password Notification';
        $title = 'Rest your password';
        $cat_btn_text = 'Reset the password';
        $body = '';
        $sendMessage   = [
            "subject"        => $subject,
            "body"           => $body,
            'path'           => config('global_variable.CONTACT_US'),
            "title"          => $title,
            'link'           => $this->url,
            "cta_btn"        => $cat_btn_text
        ];
        return (new MailMessage)
            ->subject($subject)
            ->from(config('global_variable.REGISTERED_EMAIL_ADDRESS_IN_MAILJET'))
            ->view('emails.forgetpassword', ['data' => $sendMessage]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
