<?php

use PHPUnit\Framework\TestCase;

class ContactFormTest extends TestCase
{
    public function testEmailAddressIsValid()
    {
        $receiving_email_address = 'ismael@da-christian.xyz';
        $this->assertNotEmpty($receiving_email_address);
        $this->assertTrue(filter_var($receiving_email_address, FILTER_VALIDATE_EMAIL) !== false);
    }
}