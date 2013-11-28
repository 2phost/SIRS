GECKO_SDK_PATH=d:\work\gecko-sdk-1.7
!IF "$(CFG)" == ""
CFG=Mypgp - Win32 Debug
!MESSAGE No configuration specified. Defaulting to Mypgp - Win32 Debug.
!ENDIF 

!IF "$(CFG)" != "Mypgp - Win32 Release" && "$(CFG)" != "Mypgp - Win32 Debug"
!MESSAGE Invalid configuration "$(CFG)" specified.
!MESSAGE You can specify a configuration when running NMAKE
!MESSAGE by defining the macro CFG on the command line. For example:
!MESSAGE 
!MESSAGE NMAKE /f "Mypgp.mak" CFG="Mypgp - Win32 Debug"
!MESSAGE 
!MESSAGE Possible choices for configuration are:
!MESSAGE 
!MESSAGE "Mypgp - Win32 Release" (based on "Win32 (x86) Dynamic-Link Library")
!MESSAGE "Mypgp - Win32 Debug" (based on "Win32 (x86) Dynamic-Link Library")
!MESSAGE 
!ERROR An invalid configuration is specified.
!ENDIF 

!IF "$(OS)" == "Windows_NT"
NULL=
!ELSE 
NULL=nul
!ENDIF 

!IF  "$(CFG)" == "Mypgp - Win32 Release"

OUTDIR=.\Release
INTDIR=.\Release
# Begin Custom Macros
OutDir=.\Release
# End Custom Macros

ALL : "$(OUTDIR)\Mypgp.dll" "$(OUTDIR)\Mypgp.bsc"


CLEAN :
	-@erase "$(INTDIR)\Mypgp.obj"
	-@erase "$(INTDIR)\Mypgp.sbr"
	-@erase "$(INTDIR)\MypgpModule.obj"
	-@erase "$(INTDIR)\MypgpModule.sbr"
	-@erase "$(INTDIR)\vc60.idb"
	-@erase "$(OUTDIR)\Mypgp.bsc"
	-@erase "$(OUTDIR)\Mypgp.dll"
	-@erase "$(OUTDIR)\Mypgp.exp"
	-@erase "$(OUTDIR)\Mypgp.lib"

"$(OUTDIR)" :
    if not exist "$(OUTDIR)/$(NULL)" mkdir "$(OUTDIR)"

CPP=cl.exe
CPP_PROJ=/nologo /MD /W3 /O1 /I "$(GECKO_SDK_PATH)\include" /FI"$(GECKO_SDK_PATH)\include\xpcom-config.h" /D "NDEBUG" /D "WIN32" /D "_WINDOWS" /D "_MBCS" /D "_USRDLL" /D "XPCOM_GLUE" /FR"$(INTDIR)\\" /Fp"$(INTDIR)\Mypgp.pch" /YX /Fo"$(INTDIR)\\" /Fd"$(INTDIR)\\" /FD /c 

.c{$(INTDIR)}.obj::
   $(CPP) @<<
   $(CPP_PROJ) $< 
<<

.cpp{$(INTDIR)}.obj::
   $(CPP) @<<
   $(CPP_PROJ) $< 
<<

.cxx{$(INTDIR)}.obj::
   $(CPP) @<<
   $(CPP_PROJ) $< 
<<

.c{$(INTDIR)}.sbr::
   $(CPP) @<<
   $(CPP_PROJ) $< 
<<

.cpp{$(INTDIR)}.sbr::
   $(CPP) @<<
   $(CPP_PROJ) $< 
<<

.cxx{$(INTDIR)}.sbr::
   $(CPP) @<<
   $(CPP_PROJ) $< 
<<

MTL=midl.exe
MTL_PROJ=/nologo /D "NDEBUG" /mktyplib203 /win32 
RSC=rc.exe
BSC32=bscmake.exe
BSC32_FLAGS=/nologo /o"$(OUTDIR)\Mypgp.bsc" 
BSC32_SBRS= \
	"$(INTDIR)\Mypgp.sbr" \
	"$(INTDIR)\MypgpModule.sbr" 

"$(OUTDIR)\Mypgp.bsc" : "$(OUTDIR)" $(BSC32_SBRS)
    $(BSC32) @<<
  $(BSC32_FLAGS) $(BSC32_SBRS)
<<

LINK32=link.exe
LINK32_FLAGS=kernel32.lib user32.lib gdi32.lib winspool.lib comdlg32.lib advapi32.lib shell32.lib ole32.lib oleaut32.lib uuid.lib odbc32.lib odbccp32.lib nspr4.lib plds4.lib plc4.lib xpcomglue.lib shlwapi.lib /nologo /dll /incremental:no /pdb:"$(OUTDIR)\Mypgp.pdb" /machine:I386 /out:"$(OUTDIR)\Mypgp.dll" /implib:"$(OUTDIR)\Mypgp.lib" /libpath:"$(GECKO_SDK_PATH)\lib"   
LINK32_OBJS= \
	"$(INTDIR)\Mypgp.obj" \
	"$(INTDIR)\MypgpModule.obj" 

"$(OUTDIR)\Mypgp.dll" : "$(OUTDIR)" $(DEF_FILE) $(LINK32_OBJS)
    $(LINK32) @<<
  $(LINK32_FLAGS) $(LINK32_OBJS)
<<

TargetPath=.\Release\Mypgp.dll
SOURCE="$(InputPath)"

# Begin Custom Macros
OutDir=.\Release
# End Custom Macros

!ELSEIF  "$(CFG)" == "Mypgp - Win32 Debug"

OUTDIR=.\Debug
INTDIR=.\Debug
# Begin Custom Macros
OutDir=.\Debug
# End Custom Macros

ALL : "$(OUTDIR)\Mypgp.dll" "$(OUTDIR)\Mypgp.bsc"


CLEAN :
	-@erase "$(INTDIR)\Mypgp.obj"
	-@erase "$(INTDIR)\Mypgp.sbr"
	-@erase "$(INTDIR)\MypgpModule.obj"
	-@erase "$(INTDIR)\MypgpModule.sbr"
	-@erase "$(INTDIR)\vc60.idb"
	-@erase "$(INTDIR)\vc60.pdb"
	-@erase "$(OUTDIR)\Mypgp.bsc"
	-@erase "$(OUTDIR)\Mypgp.dll"
	-@erase "$(OUTDIR)\Mypgp.exp"
	-@erase "$(OUTDIR)\Mypgp.ilk"
	-@erase "$(OUTDIR)\Mypgp.lib"
	-@erase "$(OUTDIR)\Mypgp.pdb"

"$(OUTDIR)" :
    if not exist "$(OUTDIR)/$(NULL)" mkdir "$(OUTDIR)"

CPP=cl.exe
CPP_PROJ=/nologo /MDd /W3 /Gm /ZI /Od /I "$(GECKO_SDK_PATH)\include"  /FI"$(GECKO_SDK_PATH)\include\mozilla-config.h" /D "_DEBUG" /D "WIN32" /D "_WINDOWS" /D "_MBCS" /D "_USRDLL" /D "XPCOM_GLUE" /FR"$(INTDIR)\\" /Fp"$(INTDIR)\Mypgp.pch" /YX /Fo"$(INTDIR)\\" /Fd"$(INTDIR)\\" /FD /GZ /c 

.c{$(INTDIR)}.obj::
   $(CPP) @<<
   $(CPP_PROJ) $< 
<<

.cpp{$(INTDIR)}.obj::
   $(CPP) @<<
   $(CPP_PROJ) $< 
<<

.cxx{$(INTDIR)}.obj::
   $(CPP) @<<
   $(CPP_PROJ) $< 
<<

.c{$(INTDIR)}.sbr::
   $(CPP) @<<
   $(CPP_PROJ) $< 
<<

.cpp{$(INTDIR)}.sbr::
   $(CPP) @<<
   $(CPP_PROJ) $< 
<<

.cxx{$(INTDIR)}.sbr::
   $(CPP) @<<
   $(CPP_PROJ) $< 
<<

MTL=midl.exe
MTL_PROJ=/nologo /D "_DEBUG" /mktyplib203 /win32 
RSC=rc.exe
BSC32=bscmake.exe
BSC32_FLAGS=/nologo /o"$(OUTDIR)\Mypgp.bsc" 
BSC32_SBRS= \
	"$(INTDIR)\Mypgp.sbr" \
	"$(INTDIR)\MypgpModule.sbr" 

"$(OUTDIR)\Mypgp.bsc" : "$(OUTDIR)" $(BSC32_SBRS)
    $(BSC32) @<<
  $(BSC32_FLAGS) $(BSC32_SBRS)
<<

LINK32=link.exe
LINK32_FLAGS=kernel32.lib user32.lib gdi32.lib winspool.lib comdlg32.lib advapi32.lib shell32.lib ole32.lib oleaut32.lib uuid.lib odbc32.lib odbccp32.lib nspr4.lib plds4.lib plc4.lib xpcomglue.lib shlwapi.lib /nologo /dll /incremental:yes /pdb:"$(OUTDIR)\Mypgp.pdb" /debug /machine:I386 /out:"$(OUTDIR)\Mypgp.dll" /implib:"$(OUTDIR)\Mypgp.lib" /pdbtype:sept /libpath:"$(GECKO_SDK_PATH)\lib"  
LINK32_OBJS= \
	"$(INTDIR)\Mypgp.obj" \
	"$(INTDIR)\MypgpModule.obj" 

"$(OUTDIR)\Mypgp.dll" : "$(OUTDIR)" $(DEF_FILE) $(LINK32_OBJS)
    $(LINK32) @<<
  $(LINK32_FLAGS) $(LINK32_OBJS)
<<

TargetPath=.\Debug\Mypgp.dll
SOURCE="$(InputPath)"

# Begin Custom Macros
OutDir=.\Debug
# End Custom Macros

!ENDIF 

NO_EXTERNAL_DEPS=1

!IF "$(NO_EXTERNAL_DEPS)" != "1"
!IF EXISTS("Mypgp.dep")
!INCLUDE "Mypgp.dep"
!ELSE 
!MESSAGE Warning: cannot find "Mypgp.dep"
!ENDIF 
!ENDIF 


!IF "$(CFG)" == "Mypgp - Win32 Release" || "$(CFG)" == "Mypgp - Win32 Debug"
SOURCE=.\Mypgp.cpp

"$(INTDIR)\Mypgp.obj"	"$(INTDIR)\Mypgp.sbr" : $(SOURCE) "$(INTDIR)"
	$(CPP) $(CPP_PROJ) $(SOURCE)

SOURCE=.\MypgpModule.cpp

"$(INTDIR)\MypgpModule.obj"	"$(INTDIR)\MypgpModule.sbr" : $(SOURCE) "$(INTDIR)"

!ENDIF 

