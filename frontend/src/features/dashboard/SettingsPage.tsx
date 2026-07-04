import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/providers/ThemeProvider";

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="w-full rounded-none border-b border-slate-200 bg-transparent h-auto p-0 flex justify-start overflow-x-auto">
              <TabsTrigger 
                value="general" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4 data-[state=active]:shadow-none font-medium whitespace-nowrap"
              >
                General
              </TabsTrigger>
              <TabsTrigger 
                value="notifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4 data-[state=active]:shadow-none font-medium whitespace-nowrap"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="appearance"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4 data-[state=active]:shadow-none font-medium whitespace-nowrap"
              >
                Appearance
              </TabsTrigger>
              <TabsTrigger 
                value="privacy"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4 data-[state=active]:shadow-none font-medium whitespace-nowrap"
              >
                Privacy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="p-6 space-y-8">
              {/* Theme Settings */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Theme</h3>
                <p className="text-sm text-slate-500 mb-4">Choose your preferred theme</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div 
                    className={`border-2 rounded-xl p-4 cursor-pointer hover:bg-slate-50 transition-colors ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-slate-200'}`}
                    onClick={() => setTheme('light')}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${theme === 'light' ? 'border-primary' : 'border-slate-300'}`}>
                        {theme === 'light' && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <span className="font-medium text-slate-900">Light</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-slate-200 rounded-full" />
                      <div className="h-2 w-2/3 bg-slate-200 rounded-full" />
                    </div>
                  </div>

                  <div 
                    className={`border-2 rounded-xl p-4 cursor-pointer hover:bg-slate-50 transition-colors ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-slate-200'}`}
                    onClick={() => setTheme('dark')}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${theme === 'dark' ? 'border-primary' : 'border-slate-300'}`}>
                        {theme === 'dark' && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <span className="font-medium text-slate-900">Dark</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-slate-800 rounded-full" />
                      <div className="h-2 w-2/3 bg-slate-800 rounded-full" />
                    </div>
                  </div>

                  <div 
                    className={`border-2 rounded-xl p-4 cursor-pointer hover:bg-slate-50 transition-colors ${theme === 'system' ? 'border-primary bg-primary/5' : 'border-slate-200'}`}
                    onClick={() => setTheme('system')}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${theme === 'system' ? 'border-primary' : 'border-slate-300'}`}>
                        {theme === 'system' && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <span className="font-medium text-slate-900">System</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex-1 space-y-2">
                        <div className="h-2 w-full bg-slate-200 rounded-full" />
                        <div className="h-2 w-full bg-slate-800 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100" />

              {/* Accent Color */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Accent Color</h3>
                <p className="text-sm text-slate-500 mb-4">Choose your primary color</p>
                <div className="flex gap-4">
                  <button className="w-10 h-10 rounded-full bg-indigo-600 ring-4 ring-indigo-100 ring-offset-2 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-cyan-500 hover:scale-110 transition-transform" />
                  <button className="w-10 h-10 rounded-full bg-rose-500 hover:scale-110 transition-transform" />
                  <button className="w-10 h-10 rounded-full bg-amber-500 hover:scale-110 transition-transform" />
                  <button className="w-10 h-10 rounded-full bg-emerald-500 hover:scale-110 transition-transform" />
                  <button className="w-10 h-10 rounded-full bg-violet-500 hover:scale-110 transition-transform" />
                </div>
              </div>
              
              <div className="w-full h-px bg-slate-100" />
              
              {/* Font Size */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Font Size</h3>
                <div className="max-w-xs mt-4">
                  <select className="w-full p-2.5 border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900">
                    <option value="small">Small</option>
                    <option value="medium" selected>Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="general" className="p-6 text-slate-500">
              General settings will appear here.
            </TabsContent>
            <TabsContent value="notifications" className="p-6 text-slate-500">
              Notification settings will appear here.
            </TabsContent>
            <TabsContent value="privacy" className="p-6 text-slate-500">
              Privacy settings will appear here.
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
