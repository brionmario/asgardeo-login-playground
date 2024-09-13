/**
 * MIT License
 *
 * Copyright (c) 2024, Brion Mario
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use client';

import {useState} from 'react';
import {AlertCircle} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';

const LoginPlaygroundComponent = () => {
  const [config, setConfig] = useState({
    clientId: '',
    baseUrl: '',
    discoveryEndpoint: '',
    signInRedirectURL: '',
    signOutRedirectURL: '',
  });
  const [jsonConfig, setJsonConfig] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({...config, [e.target.name]: e.target.value});
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonConfig(e.target.value);
  };

  const initiateLogin = (useJson: boolean) => {
    setError('');
    try {
      const finalConfig = useJson ? JSON.parse(jsonConfig) : config;
      console.log('Initiating login with config:', finalConfig);
      // Here you would typically call the Asgardeo React OIDC SDK to initiate login
      // For example: AsgardeoAuth.initiateLogin(finalConfig)
    } catch (err) {
      setError('Invalid configuration. Please check your input.');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Asgardeo React OIDC SDK Playground</h1>

      <Tabs defaultValue="fields">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fields">Input Fields</TabsTrigger>
          <TabsTrigger value="json">JSON Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="fields">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientId">Client ID</Label>
              <Input
                id="clientId"
                name="clientId"
                value={config.clientId}
                onChange={handleInputChange}
                placeholder="Enter Client ID"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="baseUrl">Base URL</Label>
              <Input
                id="baseUrl"
                name="baseUrl"
                value={config.baseUrl}
                onChange={handleInputChange}
                placeholder="Enter Base URL"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discoveryEndpoint">Discovery Endpoint</Label>
              <Input
                id="discoveryEndpoint"
                name="discoveryEndpoint"
                value={config.discoveryEndpoint}
                onChange={handleInputChange}
                placeholder="Enter Discovery Endpoint"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signInRedirectURL">Sign In Redirect URL</Label>
              <Input
                id="signInRedirectURL"
                name="signInRedirectURL"
                value={config.signInRedirectURL}
                onChange={handleInputChange}
                placeholder="Enter Sign In Redirect URL"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signOutRedirectURL">Sign Out Redirect URL</Label>
              <Input
                id="signOutRedirectURL"
                name="signOutRedirectURL"
                value={config.signOutRedirectURL}
                onChange={handleInputChange}
                placeholder="Enter Sign Out Redirect URL"
              />
            </div>
            <Button className="w-full" onClick={() => initiateLogin(false)}>
              Initiate Login
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="json">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jsonConfig">JSON Configuration</Label>
              <Textarea
                id="jsonConfig"
                value={jsonConfig}
                onChange={handleJsonChange}
                placeholder="Enter JSON configuration"
                className="min-h-[200px]"
              />
            </div>
            <Button className="w-full" onClick={() => initiateLogin(true)}>
              Initiate Login
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default LoginPlaygroundComponent;
