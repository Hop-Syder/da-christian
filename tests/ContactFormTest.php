<?php

use PHPUnit\Framework\TestCase;
use PHPMailer\PHPMailer\PHPMailer;

// Dans ContactFormTest.php
class ContactFormTest extends TestCase
{
    private $phpMailer;

    protected function setUp(): void
    {
        $this->phpMailer = new PHPMailer(true);
    }



    public function testFormDataProcessingAndEmailSending()
    {
        // Simuler les données POST du formulaire
        $_POST['name'] = 'Test User';
        $_POST['email'] = 'test@example.com';
        $_POST['subject'] = 'Test Subject';
        $_POST['message'] = 'Test Message';

        // Utiliser htmlspecialchars au lieu de filter_input pour les tests
        $name = htmlspecialchars($_POST['name'] ?? '');
        $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
        $subject = htmlspecialchars($_POST['subject'] ?? '');
        $message = htmlspecialchars($_POST['message'] ?? '');


        // Assertions pour vérifier les données
        $this->assertEquals('Test User', $name);
        $this->assertEquals('test@example.com', $email);
        $this->assertEquals('Test Subject', $subject);
        $this->assertEquals('Test Message', $message);

        // Configurer PHPMailer pour le test
        $this->phpMailer->isSMTP();
        $this->phpMailer->Host = 'smtp.gmail.com';
        $this->phpMailer->SMTPAuth = true;
        $this->phpMailer->Username = getenv('EMAIL_USERNAME');
        $this->phpMailer->Password = getenv('EMAIL_PASSWORD');
        $this->phpMailer->SMTPSecure = 'tls';
        $this->phpMailer->Port = 587;

        // Configurer l'email
        try {
            $this->phpMailer->setFrom($email, $name);
            $this->phpMailer->addAddress('ismael@da-christian.xyz');
            $this->phpMailer->Subject = $subject;
            $this->phpMailer->Body = $message;

            // Vérifier que l'email est correctement configuré avant l'envoi
            $this->assertEquals($email, $this->phpMailer->From);
            $this->assertEquals($name, $this->phpMailer->FromName);
            $this->assertEquals('ismael@da-christian.xyz', $this->phpMailer->getToAddresses()[0][0] ?? null);
            $this->assertEquals($subject, $this->phpMailer->Subject);
            $this->assertEquals($message, $this->phpMailer->Body);

            // Tenter l'envoi (commenté pour éviter l'envoi réel pendant les tests)
            // $sent = $this->phpMailer->send();
            // $this->assertTrue($sent);

        } catch (\Exception $e) {
            $this->fail('Erreur lors de la configuration de l\'email : ' . $e->getMessage());
        }
    }
}
