Name:           book-publish-forge
Version:        %{?version}%{!?version:0.1.0}
Release:        1%{?dist}
Summary:        Book Publish Forge desktop program
License:        Unspecified
BuildArch:      noarch
Source0:        %{name}-%{version}.tar.gz
Requires:       python3
Requires:       python3-tkinter
Requires:       ollama

%description
Book Publish Forge is a modular suite for writing and publishing. This package
installs a native desktop program (Tkinter) with optional local integrations for
Ollama and Stable Diffusion.

%prep
%setup -q

%install
mkdir -p %{buildroot}%{_datadir}/book-publish-forge
cp -a app/book_publish_forge_app.py %{buildroot}%{_datadir}/book-publish-forge/

install -Dm0755 packaging/fedora/book-publish-forge-launch.sh \
  %{buildroot}%{_bindir}/book-publish-forge
install -Dm0755 packaging/fedora/diagnose.sh \
  %{buildroot}%{_bindir}/book-publish-forge-diagnose
install -Dm0644 packaging/fedora/book-publish-forge.desktop \
  %{buildroot}%{_datadir}/applications/book-publish-forge.desktop
install -Dm0644 packaging/fedora/book-publish-forge.svg \
  %{buildroot}%{_datadir}/icons/hicolor/scalable/apps/book-publish-forge.svg

%files
%{_bindir}/book-publish-forge
%{_bindir}/book-publish-forge-diagnose
%{_datadir}/applications/book-publish-forge.desktop
%{_datadir}/icons/hicolor/scalable/apps/book-publish-forge.svg
%{_datadir}/book-publish-forge

%changelog
* Sat Feb 01 2025 Book Publish Forge Team - 0.1.0-1
- Initial Fedora package
